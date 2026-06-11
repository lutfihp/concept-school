# Git Hygiene & Remote Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `.gitignore` to exclude the `handoffs/` folder, untrack already-committed handoffs files, commit all pending changes, and push the repo to GitHub as branch `main`.

**Architecture:** Three sequential git operations — `.gitignore` cleanup, a single commit to clear tracked handoffs files, then remote setup and push. No code changes; all steps are git/shell commands.

**Tech Stack:** Git · GitHub (`https://github.com/lutfihp/concept-school.git`) · PowerShell

---

## File Map

| Action | Path |
|---|---|
| Modify | `.gitignore` |
| Untrack (keep on disk) | `handoffs/README-handoff.md` |
| Untrack (keep on disk) | `handoffs/Sekolah Bina Pandu Utama.html` |

---

## Task 1: Update `.gitignore` and untrack handoffs files

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `handoffs/` to `.gitignore`**

Open `.gitignore` and append the following block after the existing `# misc` section:

```
# design handoffs (consumed — assets copied, spec in docs/)
handoffs/
```

Full resulting `.gitignore`:

```
# dependencies
node_modules/

# next.js
.next/
out/

# misc
.DS_Store
*.pem
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*

# design handoffs (consumed — assets copied, spec in docs/)
handoffs/
```

- [ ] **Step 2: Untrack already-committed handoffs files**

```bash
git rm --cached "handoffs/README-handoff.md" "handoffs/Sekolah Bina Pandu Utama.html"
```

Expected output:
```
rm 'handoffs/README-handoff.md'
rm 'handoffs/Sekolah Bina Pandu Utama.html'
```

The files remain on disk; git stops tracking them.

- [ ] **Step 3: Verify working tree state**

```bash
git status
```

Expected: `.gitignore` shows as modified, the two `handoffs/` files show as deleted (staged), and the rest of the untracked `handoffs/` entries are gone (now ignored).

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore handoffs folder and untrack design source files"
```

---

## Task 2: Verify clean state

- [ ] **Step 1: Confirm nothing unexpected is left staged or modified**

```bash
git status
```

Expected:
```
On branch master
nothing to commit, working tree clean
```

If any files remain modified or untracked that should be committed, stage and commit them now:

```bash
git add <file>
git commit -m "chore: commit remaining working tree changes"
```

---

## Task 3: Add GitHub remote and push as `main`

- [ ] **Step 1: Add the remote**

```bash
git remote add origin https://github.com/lutfihp/concept-school.git
```

- [ ] **Step 2: Verify remote is registered**

```bash
git remote -v
```

Expected:
```
origin  https://github.com/lutfihp/concept-school.git (fetch)
origin  https://github.com/lutfihp/concept-school.git (push)
```

- [ ] **Step 3: Push local `master` to GitHub as `main`**

```bash
git push -u origin master:main
```

Expected output ends with something like:
```
 * [new branch]      master -> main
Branch 'master' set up to track remote branch 'main' from 'origin'.
```

- [ ] **Step 4: Confirm on GitHub**

Open `https://github.com/lutfihp/concept-school` in a browser and verify the `main` branch is present with the full commit history.
