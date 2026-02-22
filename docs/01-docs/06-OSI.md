# OSI Model – Networking Fundamentals

The **OSI (Open Systems Interconnection) model** is a conceptual framework used to describe how data is transmitted across a network.

It divides networking into **seven logical layers**, each responsible for a specific function.  
The OSI model is primarily used for **understanding, communication, and troubleshooting**, rather than direct implementation.

---

## Layer 7 – Application

**Function:**  
Provides network services directly to user-facing applications.

**Examples:**
- HTTP / HTTPS
- FTP
- SMTP
- DNS
- SSH

**Typical issues:**
- Websites not loading
- Email services failing
- Application-level errors

---

## Layer 6 – Presentation

**Function:**  
Responsible for **data formatting, encryption, and compression**.

**Examples:**
- TLS / SSL encryption
- Character encoding (UTF-8)
- Data compression

**Typical issues:**
- Certificate errors
- Encryption failures
- Incompatible data formats

---

## Layer 5 – Session

**Function:**  
Manages **sessions** between communicating devices.

**Responsibilities:**
- Session establishment
- Session maintenance
- Session termination

**Typical issues:**
- Session timeouts
- Dropped connections

---

## Layer 4 – Transport

**Function:**  
Controls **end-to-end data transmission** and reliability.

**Protocols:**
- TCP – reliable, ordered delivery
- UDP – fast, connectionless delivery

**Key concepts:**
- Ports
- Flow control
- Error handling

**Typical issues:**
- Blocked ports
- Slow or unreliable connections

---

## Layer 3 – Network

**Function:**  
Handles **logical addressing and routing** between networks.

**Examples:**
- IP addressing (IPv4 / IPv6)
- ICMP
- Routing tables

**Devices:**
- Routers
- Layer 3 switches

**Typical issues:**
- No route to host
- Incorrect IP configuration

---

## Layer 2 – Data Link

**Function:**  
Manages **physical addressing and local network delivery**.

**Examples:**
- MAC addresses
- ARP
- VLANs

**Devices:**
- Switches
- Network Interface Cards (NICs)

**Typical issues:**
- VLAN misconfiguration
- ARP resolution failures

---

## Layer 1 – Physical

**Function:**  
Transmits raw data over physical media.

**Examples:**
- Ethernet cabling
- Fibre optics
- Wireless signals

**Typical issues:**
- Damaged cables
- No link light
- Hardware failure

---

## OSI Model in Troubleshooting

The OSI model provides a structured method for diagnosing network issues:

- Physical connection issues → **Layer 1**
- VLAN or MAC address issues → **Layer 2**
- IP addressing or routing issues → **Layer 3**
- Port or protocol issues → **Layer 4**
- Encryption or certificate issues → **Layer 6**
- Application service issues → **Layer 7**

This layered approach supports efficient fault isolation and resolution.

