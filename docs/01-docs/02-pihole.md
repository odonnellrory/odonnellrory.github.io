# Fix Proton VPN Breaking Pi-hole Local DNS (`*.home.arpa`) on Fedora 

When running a homelab, I use Pi-hole as my LAN DNS so I can resolve hostnames like:

- `bitwarden.home.arpa`
- `pihole.home.arpa`
- `pve.home.arpa`
- `tplink.home.arpa`

My Pi-hole lives on:

- `192.168.*.***`

This works perfectly **until Proton VPN is enabled**.

Once Proton VPN connects, local hostnames often stop resolving even though:
- the services are still up,
- Pi-hole DNS works if queried directly.

This post documents the exact fix I implemented on Fedora so I can reproduce it on any new machine.

---

## Symptoms

With Proton VPN enabled:

- `bitwarden.home.arpa` might still work (browser cache / existing session)
- but `pihole.home.arpa` and other LAN names fail to resolve

Typical errors:

```bash
curl: (6) Could not resolve host: pihole.home.arpa
````

However, forcing a DNS query directly to Pi-hole **works**:

```bash
dig @192.168.*.*** pihole.home.arpa +short
# returns: 192.168.*.***
```

---

## Root Cause

On Fedora, DNS resolution is handled by `systemd-resolved`.

When Proton VPN connects, it creates a new interface (typically `proton0`) and sets:

* DNS domain: `~.` (catch-all, meaning *everything*)
* DNS server(s): Proton DNS (and sometimes Pi-hole is listed too)

Because `proton0` is now handling all DNS scopes, **queries for `home.arpa` do not get routed to Pi-hole**.

Even if Pi-hole appears as a secondary DNS server, it won’t necessarily be used:

* if Proton’s DNS answers `NXDOMAIN` (name not found)
* the resolver usually stops and does not fallback

That explains the “contradiction” where:

* `dig @192.168.*.*** …` works
* but normal apps and browsers fail

---

## “Temporary Fix” (Not Persistent)

You can force systemd-resolved to use Pi-hole for `home.arpa` like this:

```bash
sudo resolvectl dns enp0s13f0u3u2c2 192.168.*.***
sudo resolvectl domain enp0s13f0u3u2c2 '~home.arpa'
sudo resolvectl flush-caches
```

This works, but it is **not permanent**. It resets after:

* reboots
* Wi-Fi reconnects
* VPN reconnects
* NetworkManager changes

---

## Why Proton Split Tunneling Didn’t Solve It

On Linux, Proton’s split tunneling UI is **app-based**, not IP/subnet-based.

That means I cannot simply exclude `192.168.0.0/24` in the GUI.

I enabled:

* Proton “Allow LAN connections”
* Proton “Custom DNS” pointing at Pi-hole

…but DNS scoping was still hijacked under `proton0`, so `home.arpa` kept failing.

---

## Permanent Fix: NetworkManager Dispatcher Script

The most reliable approach is to use a **NetworkManager dispatcher script**.

Dispatcher scripts run automatically when:

* network links go up/down
* DHCP changes
* VPN interfaces appear
* connectivity changes

So every time Proton connects (or the LAN reconnects), the script re-applies:

* `~home.arpa` must resolve using **192.168.*.***** (Pi-hole)

### 1) Create the script

```bash
sudo nvim /etc/NetworkManager/dispatcher.d/90-home-arpa
```

Paste:

```bash
#!/usr/bin/env bash
# Force *.home.arpa to resolve via Pi-hole even when ProtonVPN steals DNS

PIHOLE="192.168.*.***"
DOM="~home.arpa"

LAN1="enp0s13f0u3u2c2"
LAN2="wlp0s20f3"

case "$2" in
  up|vpn-up|dhcp4-change|dhcp6-change|connectivity-change)
    /usr/bin/resolvectl dns "$LAN1" "$PIHOLE" 2>/dev/null || true
    /usr/bin/resolvectl domain "$LAN1" "$DOM" 2>/dev/null || true

    /usr/bin/resolvectl dns "$LAN2" "$PIHOLE" 2>/dev/null || true
    /usr/bin/resolvectl domain "$LAN2" "$DOM" 2>/dev/null || true

    /usr/bin/resolvectl flush-caches 2>/dev/null || true
    ;;
esac
```

### 2) Make it executable

```bash
sudo chmod +x /etc/NetworkManager/dispatcher.d/90-home-arpa
```

### 3) Restart NetworkManager

```bash
sudo systemctl restart NetworkManager
```

---

## Validation

With Proton VPN enabled, run:

```bash
resolvectl query pihole.home.arpa
resolvectl query tplink.home.arpa
resolvectl query bitwarden.home.arpa
```

Expected output: all names resolve correctly.

You can also test direct web access:

```bash
curl -I http://pihole.home.arpa:8081/admin
curl -I http://tplink.home.arpa
```

---

## Notes / Customization

### Interface names

My interfaces are:

* Wired: `enp0s13f0u3u2c2`
* Wi-Fi: `wlp0s20f3`

To find yours:

```bash
nmcli -t -f NAME,DEVICE,TYPE,STATE connection show --active
```

Update the script variables accordingly:

```bash
LAN1="<your-wired-interface>"
LAN2="<your-wifi-interface>"
```

Proton VPN takes over DNS resolution globally (`~.`), so this script forces `systemd-resolved` to route `*.home.arpa` lookups back to Pi-hole every time the network state changes.

---

