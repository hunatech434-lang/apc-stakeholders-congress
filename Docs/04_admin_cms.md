# Admin CMS Specification

## Navigation

- Dashboard
- Registrations
- Verification Queue
- Forums
- Documents
- Announcements
- Events
- Gallery
- Reports
- Exports
- Users & Roles
- Audit Logs
- Settings

## Dashboard widgets

1. Total forums
2. Pending
3. Under review
4. More information required
5. Verified
6. Rejected
7. Registrations by LGA
8. Registrations by senatorial district
9. Member strength
10. Recent activity

## Verification queue

Each record displays:

- Registration number
- Forum name
- LGA
- Ward
- Coordinator
- Secretary
- Submission date
- Status
- Assigned reviewer

Actions:

- Open
- Review documents
- Request information
- Approve
- Reject

Approval/rejection should require a reason where appropriate.

## Forum record

Tabs:

- Overview
- Contacts
- Structure
- Political Track Record
- Documents
- Verification
- Activity
- Audit History

Sensitive fields should be visually and technically restricted.

## Exports

Filters must be applied before export.

Examples:

- All verified forums
- Pending registrations
- LGA report
- Senatorial district report
- Activity category report
- Member strength report
- Registration period report

Export jobs should be queued for large datasets and recorded in the audit log.

## CMS content

Editors can draft and publish content.

Use statuses:

- Draft
- Scheduled
- Published
- Archived

Support featured image, title, body, author, publish date, category, SEO title/description, and social sharing metadata.

## Document templates

Admin should not edit raw templates casually.

Template configuration should include:

- Active certificate template version
- Active letterhead template version
- Authorized signatory
- Signature asset
- Stamp asset
- Document numbering policy

Changing a template must not silently alter previously issued documents.
