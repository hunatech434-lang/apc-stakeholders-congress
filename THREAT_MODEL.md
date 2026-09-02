# System Threat Model & Risk Mitigations

## 1. Assets & Trust Boundaries
* **High-Value Assets**:
  - Registered forum leadership database (Coordinators, Secretaries, Member Strengths, Office Addresses).
  - Official APC Stakeholders Congress signature assets & Letter of Recognition templates.
  - Directorate Administrator credentials & session cookies.
  - Supabase PostgreSQL database connection strings & environment secrets.
* **Trust Boundaries**:
  - Public Web Browser <---> Serverless Edge Layer (Next.js on Vercel).
  - Next.js Server Actions <---> Supabase PostgreSQL Database.
  - Document Generation Service <---> In-Memory Stream / PDF Renderer.

---

## 2. Threat Actors & Attack Scenarios

### A. Anonymous / External Attacker
* **Threat**: Automated registration spam, brute-force admin logins, dictionary attacks against status tokens, enumeration of registered groups.
* **Mitigations**:
  - Sliding-window rate limiters on login and registration endpoints.
  - Public directory page removed and replaced with privacy-preserving single-status query.
  - Cryptographically random verification tokens.
  - Security headers blocking clickjacking, framing, and MIME sniffing.

### B. Malicious Registrant
* **Threat**: Submitting fake forum information, formula injection in text fields to exploit administrative spreadsheet exports, path traversal in file uploads.
* **Mitigations**:
  - Server-side CSV / Formula Injection sanitizer prefixing formula characters with `'`.
  - Strict Zod schema validation on all inputs.
  - Upload file size caps (5MB), MIME verification, and randomized server-generated filenames.

### C. Compromised Admin Account
* **Threat**: Rogue admin attempting privilege escalation, modifying core permissions, or disabling super admin.
* **Mitigations**:
  - Granular RBAC enforcing module boundaries (DG only has read/export; Media only has CMS/export; Super Admin has access control).
  - Super Administrator account is immutable and cannot be deactivated via UI or API.
  - Append-only audit logs recording every privileged transaction.

### D. Compromised Infrastructure / Leaked Token
* **Threat**: Attacker obtaining a physical or digital document copy attempting to spoof accreditation.
* **Mitigations**:
  - Embedded dynamic QR code resolving to live online verification endpoint.
  - Instant administrative document revocation capability.

---

## 3. Residual Risk Assessment
* **Phishing**: Mitigated by strong passwords, role minimization, and audit trail observability.
* **Denial of Service**: Mitigated by Vercel Edge DDoS shielding, rate limiting, and serverless auto-scaling.
