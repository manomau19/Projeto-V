# Fixing All Versioned Imports

The build is failing because all UI components have versioned imports (e.g., `lucide-react@0.487.0`).

## Files Fixed So Far:
- ✅ /components/ui/button.tsx
- ✅ /components/ui/calendar.tsx  
- ✅ /components/ui/accordion.tsx
- ✅ /components/ui/alert.tsx
- ✅ /components/ui/alert-dialog.tsx

## Files Still Need Fixing:
All remaining UI component files need their imports updated from versioned to regular imports.

## Search & Replace Pattern:
Find: `from "PACKAGE@VERSION"`
Replace: `from "PACKAGE"`

Example replacements needed:
- `lucide-react@0.487.0` → `lucide-react`
- `@radix-ui/react-*@*.*.*` → `@radix-ui/react-*`
- `class-variance-authority@0.7.1` → `class-variance-authority`
- etc.

EXCEPTION: `react-hook-form@7.55.0` should KEEP the version!
