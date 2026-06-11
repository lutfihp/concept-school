# Deployment Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `DEPLOYMENT.md` at the project root as a self-contained, repeatable guide for building and deploying this static Next.js site to a VPS via FileZilla.

**Architecture:** Single markdown file at the repo root. No code changes. Content covers first-time VPS nginx setup, initial deploy, and re-deploy workflow. Uses `YOUR_SUBDOMAIN` as a placeholder the user replaces once.

**Tech Stack:** Markdown · nginx · certbot · FileZilla · Next.js static export

---

## File Map

| Action | Path |
|---|---|
| Create | `DEPLOYMENT.md` |

---

## Task 1: Write `DEPLOYMENT.md`

**Files:**
- Create: `DEPLOYMENT.md`

- [ ] **Step 1: Create the file with the following exact content**

Create `DEPLOYMENT.md` at the project root with this content:

````markdown
# Deployment Guide — Sekolah Bina Pandu Utama

> **Before you start:** Replace every occurrence of `YOUR_SUBDOMAIN` in this document with your actual subdomain (e.g. `concept-school.yourdomain.com`).

---

## Prerequisites

Confirm these are in place before running any steps:

- [ ] Node.js and npm installed locally
- [ ] VPS accessible via SSH
- [ ] nginx installed on VPS (`nginx -v` to verify)
- [ ] certbot installed on VPS (`certbot --version` to verify)
- [ ] DNS A-record for `YOUR_SUBDOMAIN` pointing to the VPS IP address

---

## Section 1 — First-Time VPS Setup

*Run these steps once when setting up the server for the first time.*

### 1.1 Create the web root

SSH into your VPS, then run:

```bash
sudo mkdir -p /var/www/concept-school
sudo chown -R www-data:www-data /var/www/concept-school
sudo chmod -R 755 /var/www/concept-school
```

### 1.2 Create the nginx server block

```bash
sudo nano /etc/nginx/sites-available/concept-school
```

Paste the following content exactly, replacing `YOUR_SUBDOMAIN`:

```nginx
server {
    listen 80;
    server_name YOUR_SUBDOMAIN;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name YOUR_SUBDOMAIN;

    root /var/www/concept-school;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    error_page 404 /404.html;
}
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

### 1.3 Enable the site and test

```bash
sudo ln -s /etc/nginx/sites-available/concept-school /etc/nginx/sites-enabled/
sudo nginx -t
```

Expected output from `nginx -t`:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

```bash
sudo systemctl reload nginx
```

### 1.4 Obtain SSL certificate

```bash
sudo certbot --nginx -d YOUR_SUBDOMAIN
```

Follow the prompts. Certbot will automatically rewrite the nginx config with the SSL certificate paths and reload nginx.

### 1.5 Verify HTTPS is working

Open `https://YOUR_SUBDOMAIN` in a browser. You should see a secure padlock and a blank or 404 page (the web root is still empty — that is expected).

---

## Section 2 — Initial Deploy

*Run these steps the first time you upload the built site.*

### 2.1 Build locally

Open a terminal in the project root and run:

```bash
npm run build
```

This produces an `out/` folder. That folder contains all the static files to upload. **Do not upload the `out/` folder itself — upload its contents.**

### 2.2 Upload via FileZilla

1. Open FileZilla
2. Connect to your VPS:
   - **Host:** your VPS IP address
   - **Protocol:** SFTP – SSH File Transfer Protocol
   - **Port:** 22
   - **Logon Type:** Normal (or Key file if you use SSH keys)
3. In the **Remote site** panel, navigate to `/var/www/concept-school`
4. In the **Local site** panel, navigate into the `out/` folder inside the project (you should see `_next/`, `index.html`, `id.html`, etc. directly)
5. Select all files and folders (`Ctrl+A`)
6. Drag them to the remote panel, or right-click → **Upload**
7. Wait for the transfer to complete

### 2.3 Fix file permissions on VPS

SSH into the VPS and run:

```bash
sudo chown -R www-data:www-data /var/www/concept-school
```

### 2.4 Verify

Open `https://YOUR_SUBDOMAIN` in a browser. The site should load and redirect to `https://YOUR_SUBDOMAIN/id`.

---

## Section 3 — Re-deploy After Changes

*Every time you edit the site and want to publish the update.*

### 3.1 Edit and rebuild

Make your changes to the source files, then run:

```bash
npm run build
```

### 3.2 Clear old files on VPS via FileZilla

1. Connect to VPS in FileZilla
2. Navigate remote to `/var/www/concept-school`
3. Select all files and folders (`Ctrl+A`)
4. Right-click → **Delete** and confirm

> **Why delete first?** The `_next/` folder contains hashed asset filenames that change on every build. Old files would accumulate and waste disk space.

### 3.3 Upload new files

1. Navigate local to the `out/` folder
2. Select all (`Ctrl+A`)
3. Upload to `/var/www/concept-school`

### 3.4 Fix permissions

SSH into VPS:

```bash
sudo chown -R www-data:www-data /var/www/concept-school
```

### 3.5 Verify

Reload `https://YOUR_SUBDOMAIN` in a browser (hard refresh: `Ctrl+Shift+R`).

> **No nginx reload needed.** Changes to static files are served immediately — nginx only needs reloading when its config changes.

---

## Notes

- `out/` is gitignored. It is always regenerated from source — never commit it.
- The locale redirect (`/` → `/id`) is a static HTML redirect page generated by Next.js inside `out/index.html`. No server-side logic required.
- Routes like `/id/berita` are served from `out/id/berita.html`. The nginx `try_files $uri $uri.html` directive handles this transparently.
- If certbot auto-renewal is configured (`certbot renew --dry-run` to check), SSL certificates renew automatically every 90 days with no manual steps.
````

- [ ] **Step 2: Verify the file was created**

```bash
ls DEPLOYMENT.md
```

Expected: `DEPLOYMENT.md` listed.

- [ ] **Step 3: Commit and push**

```bash
git add DEPLOYMENT.md
git commit -m "docs: add deployment guide for VPS + FileZilla workflow"
git push
```

Expected: commit pushed to `origin/main` on GitHub.
