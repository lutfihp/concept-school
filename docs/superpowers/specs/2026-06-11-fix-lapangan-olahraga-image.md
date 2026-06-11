# Fix: Broken Lapangan Olahraga Image

## Problem

Pexels photo `1634149` (the Sports Field / Lapangan Olahraga slot in the Facilities section) is broken.

## Solution

Replace `FAC_IMAGES[2]` in `src/components/sections/Facilities.tsx` with Pexels photo `972513` — a child playing soccer on a grass field. Free under the Pexels License, no attribution required.

## Change

**File:** `src/components/sections/Facilities.tsx`, line 8

```diff
- 'https://images.pexels.com/photos/1634149/pexels-photo-1634149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
+ 'https://images.pexels.com/photos/972513/pexels-photo-972513.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
```

No other files change. Build output is unchanged (16/16 static pages).
