# Functional Requirements

## 1. Public website

### Required pages

- Home
- About Us
- Register Your Forum
- Registration Status / Retrieve Documents
- Verified Groups
- News & Updates
- Events / Gallery
- Get Involved
- Contact
- Privacy Policy
- Terms / Disclaimer

### Homepage

Primary CTA: **Register Your Forum**

Secondary CTA: **Check Registration Status**

Optional CTA: **Join the Congress WhatsApp Community**

The site must clearly state that the current registration jurisdiction is Kwara State and that nationwide expansion is planned.

## 2. Registration workflow

1. User opens registration.
2. System displays privacy/data-use notice.
3. User completes multi-step form.
4. Client-side validation runs.
5. Server-side validation repeats all important checks.
6. Files are scanned/validated.
7. Submission receives unique reference number.
8. Record enters **Submitted / Pending Review**.
9. Admin reviews submission.
10. Admin may request more information.
11. State-level approval proceeds according to configured workflow.
12. Final approval changes status to **Approved / Verified**.
13. System generates:
    - Certificate of Registration
    - Letter of Recognition on official letterhead
14. Documents are stored as immutable generated records with version metadata.
15. User can download both documents.
16. User can later retrieve the same documents securely.

## 3. Document generation

### Certificate

Use a designed certificate template containing:

- Official logo
- Congress name
- Certificate title
- Dynamic forum name
- Dynamic registration number
- Dynamic LGA / State
- Date of issue
- Verification status
- Authorized Director/Coordinator name
- Authorized signature image
- Official stamp/seal
- Optional QR verification code
- Footer/legal statement

The certificate should be designed once as a master template rather than manually uploading a new certificate for every group.

### Letter of Recognition

Use the client's approved official letterhead as the base template.

Dynamic fields should include:

- Date
- Recipient/forum name
- Address where appropriate
- Subject
- Recognition text
- Registration number
- State/LGA
- Authorized officer name/title
- Authorized signature
- Official stamp

**Important:** generated documents should only be created after the configured approval threshold is met.

## 4. Admin CMS

### Dashboard

Show:

- Total registrations
- Pending review
- Under review
- Approved / verified
- Rejected
- More information required
- Registrations by LGA
- Registrations by senatorial district
- Registrations by activity/focus
- Member-strength totals
- Recent submissions

### Forum management

Admin can:

- Search
- Filter
- View complete profile
- Review documents
- Add internal notes
- Request corrections
- Approve
- Reject
- Suspend/revoke
- Edit permitted administrative fields
- Export selected records

### Exports

Support:

- XLSX
- CSV
- PDF reports

Exports must be permission-controlled and logged.

### Content management

Admin can create/edit/publish:

- Announcements
- News
- Events
- Gallery items
- Notices
- Training information
- Homepage notices

## 5. Roles

### Super Admin

Full system control.

### State Admin

Manage Kwara registrations and assigned workflows.

### Verification Officer

Review submissions and recommend approval/rejection.

### Forum Admin

Access only the forum's own information and permitted member functions.

### Content Editor

Manage public content without access to sensitive registration data.

### Reporting Viewer

Read dashboards and approved reports only.

Use least privilege.

## 6. Notifications

Notification channels should be abstracted so providers can change later.

Potential channels:

- Email
- SMS
- WhatsApp, where an approved API/provider is available
- In-app notifications

Events:

- Registration received
- More information requested
- Registration approved
- Registration rejected
- Documents ready
- Important announcement

Do not build around unofficial WhatsApp automation.

## 7. Verified groups directory

Only approved records appear publicly.

Public fields should be deliberately limited. Do not expose private phone numbers, NIN, bank details, uploaded documents, or other sensitive information.

Suggested public fields:

- Forum name
- Category/activity
- LGA
- Ward, if appropriate
- Area of coverage
- Verification status
- Registration date, if desired

## 8. Audit trail

Log security and administrative actions including:

- Login
- Registration submission
- Record view where appropriate
- Data changes
- Approval/rejection
- Document generation
- Document download
- Export
- Role changes
- Content publication
- Status changes

Audit logs must not be casually editable by ordinary admins.
