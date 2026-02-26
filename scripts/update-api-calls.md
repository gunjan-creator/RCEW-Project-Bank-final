# Update API Calls Guide

## Quick Find & Replace Instructions

For each file listed below, you need to:
1. Add import: `import { apiFetch } from "@/lib/api";`
2. Replace `fetch("/api/` with `apiFetch("/api/`
3. Replace `fetch(\`/api/` with `apiFetch(\`/api/`

---

## Files to Update

### 1. client/pages/Browse.tsx
**Add import:**
```typescript
import { apiFetch } from "@/lib/api";
```

**Replace (3 occurrences):**
- Line ~43: `fetch(\`/api/projects?${params}\`)` → `apiFetch(\`/api/projects?${params}\`)`
- Line ~69-70: `fetch('/api/projects/stats')` → `apiFetch('/api/projects/stats')`
- Line ~70: `fetch('/api/projects/years')` → `apiFetch('/api/projects/years')`
- Line ~90: `fetch(\`/api/projects/${projectId}/view\`)` → `apiFetch(\`/api/projects/${projectId}/view\`)`

---

### 2. client/pages/Index.tsx
**Add import:**
```typescript
import { apiFetch } from "@/lib/api";
```

**Replace (2 occurrences):**
- Line ~42: `fetch("/api/projects?limit=3&sortBy=recent")` → `apiFetch("/api/projects?limit=3&sortBy=recent")`
- Line ~54: `fetch("/api/projects/stats")` → `apiFetch("/api/projects/stats")`

---

### 3. client/pages/Upload.tsx
**Add import:**
```typescript
import { apiFetch } from "@/lib/api";
```

**Replace (1 occurrence):**
- Line ~120: `fetch('/api/projects'` → `apiFetch('/api/projects'`

---

### 4. client/pages/Profile.tsx
**Add import:**
```typescript
import { apiFetch } from "@/lib/api";
```

**Replace (1 occurrence):**
- Line ~70: `fetch('/api/auth/upload-photo'` → `apiFetch('/api/auth/upload-photo'`

---

### 5. client/pages/EditProfile.tsx
**Add import:**
```typescript
import { apiFetch } from "@/lib/api";
```

**Replace (2 occurrences):**
- Line ~101: `fetch("/api/auth/update-profile"` → `apiFetch("/api/auth/update-profile"`
- Line ~181: `fetch("/api/auth/upload-photo"` → `apiFetch("/api/auth/upload-photo"`

---

### 6. client/pages/ProjectDetails.tsx
**Add import:**
```typescript
import { apiFetch } from "@/lib/api";
```

**Replace (4 occurrences):**
- Line ~45: `fetch(\`/api/projects/${projectId}\`)` → `apiFetch(\`/api/projects/${projectId}\`)`
- Line ~72: `fetch(\`/api/projects/${projectId}/view\`)` → `apiFetch(\`/api/projects/${projectId}/view\`)`
- Line ~90: `fetch(\`/api/projects/${project.id}/rate\`)` → `apiFetch(\`/api/projects/${project.id}/rate\`)`
- Line ~126: `fetch(\`/api/projects/${project.id}/faculty-validation\`)` → `apiFetch(\`/api/projects/${project.id}/faculty-validation\`)`

---

### 7. client/components/UserProfile.tsx
**Add import:**
```typescript
import { apiFetch } from "@/lib/api";
```

**Replace (1 occurrence):**
- Line ~68: `fetch("/api/auth/upload-photo"` → `apiFetch("/api/auth/upload-photo"`

---

## Automated Approach (Optional)

If you want to do this programmatically, you can use a script or let me update all files for you.

Would you like me to update all these files automatically?
