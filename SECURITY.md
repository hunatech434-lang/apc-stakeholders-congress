# Security Architecture & Operations Policy

## 1. Overview
The **APC Stakeholders Congress Portal** is engineered with defense-in-depth security principles to safeguard organizational and personal registrant data across Kwara State and nationwide operations.

---

## 2. Authentication & Session Security
* **Password Hashing**: Bcrypt with salt rounds = 10.
* **Session Mechanism**: Signed, encrypted JWTs (`HS256`) stored in `HttpOnly`, `SameSite=Lax`, `Secure` cookies with 24-hour expiration.
* **Brute-Force & Credential Stuffing Protection**: Sliding-window rate limiting on all login attempts (5 attempts/min threshold).
* **Zero Client-Side Auth Trust**: Frontend components check state only for UX; all mutations and privileged queries enforce strict server-side authorization.

---

## 3. Role-Based Access Control (RBAC)
The system enforces strict principle of least privilege across 3 designated roles:

| Role | Permissions | Authorized Actor |
| :--- | :--- | :--- |
| **Super Admin** | Full privileges, admin toggling, verifications, CMS, data exports, logs | `33kahuna` |
| **Reporting Viewer (DG)** | View submitted registrations & export clean registry (read-only) | `dghakeem` |
| **Media & Operations** | Manage News, Announcements, Gallery + View/Export registry | `apcscarewa` |

* **Account Protection**: The primary Super Administrator account cannot be disabled through UI or API.
* **Object-Level Authorization**: Direct resource lookups (`/api/documents/[id]/download`, `/admin/forums/[id]`) enforce ownership, active status, and role boundaries before resolving records.

---

## 4. Document & Artifact Security
* **Server-Side Rendering**: Letters of Recognition and Certificates are rendered strictly server-side using validated database models. User-supplied HTML/CSS is never rendered into documents.
* **Verification Tokens**: Random UUID tokens embedded into QR codes point to `/verify/[token]`. No confidential personal contact data is embedded in QR payloads.
* **Revocation Support**: If a forum registration is queried or revoked, verification endpoints immediately display updated revoked status and prevent document re-issuance.

---

## 5. Input Validation & Output Encoding
* **Strict Schemas**: All registration and administrative inputs are validated using `zod` schemas enforcing string lengths, phone number patterns, LGA foreign key constraints, and enum sets.
* **CSV / Spreadsheet Injection Defense (CWE-1236)**: All exported text fields are sanitized to neutralize formula triggers (`=`, `+`, `-`, `@`, `\t`, `\r`, `%`) preventing malicious code execution in Microsoft Excel and spreadsheet tools.
* **XSS Defense**: React automated HTML entity escaping + Content-Security-Policy.

---

## 6. Security Headers
The following HTTP headers are enforced on all routes:
* `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
* `X-Content-Type-Options: nosniff`
* `X-Frame-Options: DENY`
* `X-XSS-Protection: 1; mode=block`
* `Referrer-Policy: strict-origin-when-cross-origin`
* `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 7. Audit Logging & Compliance
* All privileged administrative events (`ADMIN_LOGIN_SUCCESS`, `ADMIN_USER_STATUS_TOGGLE`, `DATA_EXPORT_XLSX`, `GOOGLE_DRIVE_BATCH_SYNC`, `DOCUMENT_ISSUANCE`) are recorded to an append-only `AuditLog` table containing actor ID, IP metadata, timestamp, and target entity IDs.
* Passwords, sensitive tokens, and authentication secrets are never recorded in logs.

---

## 8. Incident Response Protocol
1. **Identification**: Anomaly detection on failed logins, rate limit triggers, or unhandled exceptions.
2. **Containment**: Immediate temporary session invalidation or account deactivation via Super Admin panel.
3. **Remediation**: Secret rotation (`JWT_SECRET`, `DATABASE_URL`) via Vercel / Supabase vault.
4. **Preservation**: Audit logs maintained in Supabase PostgreSQL for forensic review.
