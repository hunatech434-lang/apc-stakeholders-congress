# API & System Architecture

## Recommended architecture

For the first production release:

- Next.js frontend/application layer
- PostgreSQL database
- Object storage for documents/images
- Server-side PDF/document generation
- Background job processing for exports and notifications
- Role-based authorization
- Managed deployment with automated backups

Laravel is also viable. Do not use React + Laravel + Node + multiple backends without a reason. That creates needless operational complexity.

## Core API domains

### Authentication

- POST /auth/login
- POST /auth/logout
- POST /auth/refresh
- POST /auth/password-reset

### Registration

- POST /registrations
- GET /registrations/{reference}
- PATCH /registrations/{id}
- POST /registrations/{id}/submit
- POST /registrations/{id}/documents

### Verification

- GET /admin/verification
- POST /admin/registrations/{id}/request-information
- POST /admin/registrations/{id}/approve
- POST /admin/registrations/{id}/reject
- POST /admin/registrations/{id}/suspend

### Documents

- GET /registrations/{id}/documents
- GET /documents/{id}/download
- GET /verify/{token}

### Directory

- GET /groups
- GET /groups/{public-slug}

### CMS

- CRUD /admin/announcements
- CRUD /admin/events
- CRUD /admin/gallery

### Reports

- GET /admin/reports/summary
- POST /admin/exports

## Architecture rules

- Validate on server
- Authorize every protected action
- Use transactions for status transitions and document issuance
- Make document generation idempotent
- Make notification jobs retryable
- Keep provider integrations behind interfaces
- Do not couple core registration logic to SMS/WhatsApp vendors

## Status machine

Recommended transition rules:

Draft -> Submitted
Submitted -> Under Review
Under Review -> More Information Required
More Information Required -> Submitted
Under Review -> Approved
Under Review -> Rejected
Approved -> Suspended
Suspended -> Reinstated / Revoked

Only authorized roles can perform each transition.

## Auditability

Important state changes must be recorded atomically with the business operation where possible.
