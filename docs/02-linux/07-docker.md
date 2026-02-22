# Docker

## Docker Compose
On my homelab I have my .env at the root of the superrepo, this stops me having repeatedly set environment variables for every stack.  They all share one.

So to make a new stack use that .env, I have to use docker with these flags to ensure it uses my file.

```
docker compose --env-file ../../.env up -d

```

---

