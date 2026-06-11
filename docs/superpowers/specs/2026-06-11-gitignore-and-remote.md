# Git Hygiene & Remote Setup — Sekolah Bina Pandu Utama

**Date:** 2026-06-11  
**Status:** Approved

## Goal

Clean up tracked files, update `.gitignore`, commit all pending changes, and push the repository to GitHub as branch `main`.

## Tasks

### 1. Update `.gitignore`

Add `handoffs/` to `.gitignore`. The handoffs folder is source design material that has already been consumed:
- Favicons copied to `src/app/` and `public/`
- Design spec extracted to `docs/superpowers/specs/` and `CLAUDE.md`

No further value in tracking it.

**Lines to add to `.gitignore`:**
```
# design handoffs (consumed — assets copied, spec in docs/)
handoffs/
```

### 2. Untrack already-tracked handoffs files

Two handoffs files were committed in earlier sessions and are now modified:
- `handoffs/README-handoff.md`
- `handoffs/Sekolah Bina Pandu Utama.html`

Run `git rm --cached` to stop tracking them without deleting them from disk. After `.gitignore` is updated they will be silently ignored.

### 3. Commit all changes

Single commit covering:
- Updated `.gitignore`
- Removal of `handoffs/` files from tracking (via `git rm --cached`)

### 4. Add GitHub remote and push as `main`

```bash
git remote add origin https://github.com/lutfihp/concept-school.git
git push -u origin master:main
```

Local branch stays `master`. GitHub receives a `main` branch. The remote tracking ref will be `origin/main`.

## Verification

- `git status` shows clean working tree after commit
- `git remote -v` shows `origin` pointing to the GitHub URL
- GitHub repo shows `main` branch with all commits
