# APC Stakeholders Congress Portal

## Project blueprint

**Project:** APC Stakeholders Congress Portal
**Initial deployment:** Kwara State, Nigeria
**Future scope:** Nationwide Nigeria
**Project type:** Registration, verification, documentation, administration, communication and stakeholder data platform
**Primary organization:** APC Stakeholders Congress, Kwara State Chapter
**Primary contact:** [apcstakeholderscongress@gmail.com](mailto:apcstakeholderscongress@gmail.com)
**Telephone:** 07030592380, 08032010479, 07031693124
**Office:** APC Kwara North House, Fate Road, Ilorin, Kwara State
**Official WhatsApp group:** https://chat.whatsapp.com/GbP3WPz0aOKKGTokyEAmRZ

---

# 1. Executive summary

The APC Stakeholders Congress Portal is a digital platform for registering, organizing, verifying, documenting and communicating with forums, associations and support groups operating under the APC Stakeholders Congress.

The initial implementation will cover **Kwara State only**, while the underlying architecture will be designed for eventual nationwide deployment.

The platform will allow the authorized secretary, chairman, president or designated representative of a forum or association to submit its organizational information online.

Following submission, administrators will be able to review and verify the registration.

Once a registration reaches the appropriate approved status, the system will automatically generate:

1. A **Certificate of Registration**
2. A **Letter of Recognition** generated on the organization's official letterhead

The documents will contain the group's approved information, unique registration number, date and authorized signatory information.

The registrant will receive access to download the documents.

If documents are subsequently regenerated, they must remain available from the registration dashboard.

The platform will also provide a WhatsApp group/community joining mechanism, public information pages, verified-group directory, news and announcements, and a secure administrative CMS.

The administrative platform will provide:

* Registration management
* Verification workflow
* Forum records
* Search and filtering
* Document generation
* Document re-download
* Data export
* Notifications
* CMS/news management
* User and role management
* Audit logs
* Dashboard analytics
* Geographic reporting
* Registration statistics
* Activity monitoring

The system must be designed so that expanding from Kwara State to nationwide operation does not require rebuilding the application.

---

# 2. Product vision

The long-term vision is to create a reliable digital registry and administrative infrastructure for APC Stakeholders Congress forums, associations and support groups.

The platform should become the organization's operational source of truth for:

* Who the registered groups are
* Where they operate
* Who leads them
* Their contact information
* Their declared membership strength
* Their focus areas
* Their organizational information
* Their verification status
* Their registration documents
* Their support requirements
* Their submitted information
* Official communications

The system should replace fragmented spreadsheets, WhatsApp messages, paper forms and manually prepared registration documents with one controlled digital system.

---

# 3. Core product principle

The most important architectural principle is:

> **Capture structured data once, then reuse it everywhere.**

For example, when a forum enters:

**Forum Name:** ABC Professionals Forum

that information should automatically become available to:

* Registration record
* Admin dashboard
* Verified Groups directory
* Certificate
* Letter of Recognition
* Search results
* Reports
* Excel exports
* PDF reports
* Notifications
* Future member management

Administrators should never need to type the same information into multiple systems.

The database is the source of truth.

Everything else is generated from it.

---

# 4. Initial geographical scope

## 4.1 Launch scope

The first release is restricted to:

**Nigeria → Kwara State**

Registration must not allow users to select another Nigerian state during the initial launch.

## 4.2 Kwara geographical hierarchy

The system should support:

**Kwara State**
→ Senatorial District
→ Local Government Area
→ Ward
→ Forum / Association

The three Kwara senatorial districts are:

* Kwara Central
* Kwara North
* Kwara South

The system should maintain a proper structured location database rather than allowing users to type locations freely wherever possible.

## 4.3 Future national architecture

The database should eventually support:

Nigeria
→ State
→ Senatorial District
→ LGA
→ Ward
→ Forum
→ Leadership
→ Members

The initial UI can hide nationwide functionality.

The database should not.

---

# 5. Product objectives

## 5.1 Primary objectives

1. Digitize forum and association registration.
2. Create a centralized registry.
3. Capture standardized organizational information.
4. Establish a controlled verification process.
5. Automatically generate official registration documents.
6. Allow approved registrants to retrieve documents later.
7. Give administrators a centralized CMS.
8. Provide searchable and filterable organizational records.
9. Provide exportable reports.
10. Provide a controlled communication mechanism.
11. Build infrastructure capable of nationwide expansion.

## 5.2 Secondary objectives

* Reduce administrative paperwork.
* Reduce duplicate records.
* Improve data quality.
* Improve reporting.
* Improve institutional memory.
* Reduce dependence on spreadsheets.
* Make registration easier on mobile devices.
* Establish a consistent registration numbering system.

---

# 6. Non-goals for the initial release

The first release should NOT attempt to become everything at once.

The following should not be treated as mandatory MVP functionality:

* Full political party membership management
* Electoral voting systems
* Financial accounting
* Online donations
* Dues collection
* Complex CRM
* Full-scale SMS marketing automation
* AI political targeting
* Voter persuasion systems
* National deployment
* Complex polling-unit election operations
* Biometric identity infrastructure
* NIN verification unless a clearly documented requirement is established

These can be considered later.

The first release should be excellent at:

**Register → Review → Verify → Generate documents → Manage → Report → Communicate**

---

# 7. Primary users

## 7.1 Public visitor

Can:

* View website
* Read about the Congress
* View public information
* View verified groups if directory is enabled
* Read news
* View gallery
* Contact the organization
* Start registration

## 7.2 Forum representative

The representative may be:

* Chairman
* President
* Secretary
* Coordinator
* Authorized representative

Can:

* Start registration
* Complete registration
* Upload required information
* Upload documents
* Submit registration
* View registration status
* Download approved documents
* Re-download documents
* Receive official notifications

## 7.3 Forum administrator

A future expanded role.

Can manage:

* Forum profile
* Leadership information
* Members
* Activities
* Documents
* Communications

## 7.4 State administrator

Can:

* View Kwara registrations
* Search records
* Review registrations
* Request corrections
* Recommend approval
* Reject registrations
* View documents
* Generate reports
* Export data
* Manage announcements
* Manage relevant CMS content

## 7.5 National administrator

Future role.

Can:

* View all states
* Manage state administrators
* View national analytics
* Approve registrations
* Manage national communications
* Generate nationwide reports
* Manage nationwide configuration

## 7.6 Super administrator

Highest system role.

Can:

* Manage everything
* Manage administrators
* Configure system
* Configure document templates
* Configure registration numbering
* Configure locations
* Manage permissions
* View audit logs
* Manage system settings

---

# 8. Public website architecture

The public website should contain:

## Main navigation

* Home
* About Us
* Register Your Forum
* Verified Groups
* News & Gallery
* Get Involved
* Contact
* Login

The navigation should be mobile-first.

---

# 9. Homepage

## Hero

Headline:

**UNITING APC STAKEHOLDERS FOR VICTORY 2027**

Supporting message:

The official platform for APC forums, associations and support groups to register, connect and work with APC Stakeholders Congress.

Primary actions:

* Register Your Forum
* Join a Group
* Login

The hero should avoid excessive visual clutter.

The website should communicate institutional credibility rather than looking like a campaign flyer.

---

# 10. About Us

The About page should use the approved supplied organizational content.

## Who we are

The APC Stakeholders Congress is the umbrella body for all pro-APC forums, associations and support groups across Nigeria and in Kwara State.

The organization describes itself as a grassroots movement of committed party members, professionals, youths, women and leaders working together to strengthen the All Progressives Congress.

The page should communicate the organization's stated role as a bridge between party leadership and grassroots stakeholders.

## Aim

To serve as a united, strategic and credible body of committed APC members that will mobilize, coordinate and provide support for the growth, sustainability and electoral success of the All Progressives Congress at Ward, LGA, State and National levels.

## Vision

A united, vibrant and winning APC driven by active stakeholders committed to progressive governance, national development and the ideals of the party.

## Mission

To mobilize, coordinate and empower APC support groups and forums through a centralized platform promoting unity, communication, capacity building and grassroots engagement.

## Objectives

Display the organization's six stated objectives:

1. Mobilize and harmonize.
2. Support party leadership.
3. Strengthen the grassroots.
4. Defend party ideals.
5. Mentor and empower.
6. Foster peace and discipline.

## What we do

Display:

1. Centralized Registration & Verification
2. Grassroots Mobilization
3. Capacity Building & Training
4. Communication & Feedback
5. Support & Empowerment
6. Election Readiness

## Core values

**Unity | Loyalty | Service | Integrity | Grassroots First | Party Supremacy**

---

# 11. Forum registration system

The registration system is the core of the product.

It should be designed as a structured multi-step workflow rather than one giant intimidating form.

Recommended steps:

### Step 1 — Forum details

* Forum name
* Coordinator name
* Secretary name
* Area of coverage
* LGA
* Ward
* Office address
* Establishment year
* Total membership strength

### Step 2 — Contact information

* Coordinator phone
* Secretary phone
* Forum email
* Social media handles
* Coordinator passport photograph

### Step 3 — Forum structure

* Key activities
* WhatsApp availability
* WhatsApp group link where applicable

### Step 4 — Political track record

* Previous APC election participation
* Role played
* APC leader/sponsor affiliation

### Step 5 — Commitment

* Commitment to support APC candidates
* Commitment to work with APC Stakeholders Congress
* Declaration

### Step 6 — Support requirements

* Training
* Logistics
* Branded materials
* Data/sensitization materials
* Financial support
* None

### Step 7 — Documents

* Forum Resolution Letter
* Other permitted documents in future

### Step 8 — Review and submit

Display a complete summary before submission.

The user must be able to go backwards and correct information before submitting.

---

# 12. Registration form data model

The form supplied by the organization should be treated as the initial business requirement.

However, implementation should distinguish between:

1. Human-readable labels
2. Database fields
3. Validation rules
4. Required/optional state
5. Privacy classification
6. Document-generation fields
7. Searchable fields

This prevents the database from becoming a copy of the form.

---

# 13. Required registration fields

## Forum identity

* Forum name
* Coordinator
* Secretary
* Area of coverage
* State
* LGA
* Ward
* Office address
* Year established
* Total registered members

## Contact

* Coordinator phone
* Secretary phone
* Forum email
* Social media handles
* Coordinator photograph

## Structure

* Key activities
* Other activity
* WhatsApp availability
* WhatsApp link

## Track record

* Previous election activity
* Election role
* APC leader/sponsor

## Commitment

* APC 2027 commitment
* APC Stakeholders Congress alignment
* Declaration acceptance

## Support

* Training
* Logistics
* Branded materials
* Data/sensitization materials
* Financial support
* None

## Documents

* Forum Resolution Letter

---

# 14. Registration validation

The frontend must provide immediate validation.

Examples:

### Phone

Accept Nigerian phone formats but normalize them internally.

Example:

`08032010479`

should internally become:

`+2348032010479`

if the application uses international phone normalization.

### Email

Validate syntax.

### Membership strength

Must be:

* Numeric
* Positive or zero depending on business rule
* Within reasonable system limits

### Establishment year

Cannot be a future year.

### WhatsApp

If the user selects "Yes", WhatsApp link becomes required.

### Other activities

If "Others" is selected, an additional text field appears.

### Required declaration

Submission must be impossible until the declaration is accepted.

---

# 15. Duplicate detection

The system must actively detect possible duplicate registrations.

Potential duplicate signals:

* Same forum name
* Similar forum name
* Same coordinator phone
* Same secretary phone
* Same email
* Same LGA + Ward + similar forum name

The system should not automatically reject every match.

Instead:

**Possible duplicate detected → flag for administrator review.**

This prevents a common problem where people slightly change the name of an existing group and register it again.

---

# 16. Registration reference number

Every submitted registration must receive a unique registration reference.

Recommended structure:

**APCSC-KW-2026-000001**

Where:

* APCSC = organization identifier
* KW = Kwara
* 2026 = registration year
* 000001 = sequential registration number

Future national registrations could become:

**APCSC-LG-2027-000001**

or another agreed structure.

The exact numbering convention should be configurable rather than hard-coded.

The registration number should appear on:

* Admin record
* Certificate
* Letter of Recognition
* Emails
* Download page
* Reports

---

# 17. Registration lifecycle

The registration workflow should be:

**Draft**
↓
**Submitted**
↓
**Under Review**
↓
**Correction Required**
↓
**Resubmitted**
↓
**Approved**
↓
**Documents Generated**
↓
**Verified**

Possible terminal status:

**Rejected**

The system should preserve status history.

---

# 18. Verification workflow

## Stage 1 — Submission

Registrant submits the form.

The system:

* validates the form
* creates the registration record
* generates reference number
* stores uploaded documents
* records timestamp
* records submission source
* sends confirmation

## Stage 2 — Administrative review

State administrator examines:

* Group information
* Leadership
* Location
* Membership strength
* Documents
* Declaration
* Duplicate warnings

Administrator can:

* Approve for verification
* Request correction
* Reject

## Stage 3 — Approval

Once approved:

* Registration status becomes Verified
* Certificate generated
* Letter generated
* Documents become available
* Verification timestamp recorded

---

# 19. Correction workflow

This is essential.

Administrators should not have to reject a registration simply because someone typed the wrong phone number.

Administrator selects:

**Request Correction**

and specifies the fields requiring correction.

Registrant receives:

**Your registration requires correction.**

They log in and update the specified fields.

The original submission should remain in the audit history.

The new submission creates a new version.

---

# 20. Document generation system

This should be a dedicated subsystem.

Do not generate PDFs by manually placing text in code for every document.

Create a reusable document-generation architecture.

---

# 21. Certificate of Registration

The certificate should be professionally designed as a proper certificate template.

Recommended elements:

* Official APC Stakeholders Congress logo
* Organization name
* Certificate title
* Certificate number / registration number
* Forum name
* State
* LGA
* Ward
* Registration date
* Verification date
* Official declaration
* Director/authorized officer name
* Director/authorized officer title
* Signature
* Official stamp/seal
* Optional QR verification code

The forum name should be inserted dynamically.

Example:

**CERTIFICATE OF REGISTRATION**

This is to certify that

**ABC PROFESSIONALS FORUM**

has been duly registered with the

**APC STAKEHOLDERS CONGRESS**

Registration No:

**APCSC-KW-2026-000001**

---

# 22. Certificate design recommendation

The certificate should NOT simply be a blank Canva-like image with a large empty space.

It should be designed as a reusable official document template.

Dynamic fields should be positioned into clearly defined regions.

Recommended approach:

**Static template**
+
**Dynamic data**
+
**Authorized signature**
+
**Official seal**
+
**QR verification**

This makes the document generation system reliable and scalable.

---

# 23. Letter of Recognition

The Letter of Recognition should use the organization's official letterhead supplied by the client.

The system should treat the letterhead as a document template.

Dynamic fields can include:

* Date
* Recipient/forum name
* Registration number
* LGA
* Ward
* Recognition statement
* Director/authorized officer name
* Signature
* Stamp

The letter should be generated as a PDF.

---

# 24. Signature and stamp architecture

Do not require administrators to manually upload a signature every time.

The system should store the currently authorized document signatory configuration.

Example:

**Authorized Signatory**

Name: Director General / Director
Title: Director General
Signature asset: uploaded transparent PNG
Stamp asset: uploaded transparent PNG
Effective from: date

If leadership changes, administrators can update the signatory.

Previously generated documents should remain immutable.

This is important.

If the Director changes in 2027, the 2026 certificate should not suddenly regenerate using the 2027 Director's signature.

---

# 25. Document versioning

Every generated document should contain:

* Document ID
* Registration ID
* Template version
* Generated date
* Signatory version

This provides historical integrity.

Example:

`Certificate APCSC-KW-2026-000001 v1`

---

# 26. QR verification

The certificate and letter should ideally contain a QR code.

Scanning it should open a public verification page such as:

**/verify/APCSC-KW-2026-000001**

The page should show only safe public information:

* Registration number
* Forum name
* State
* LGA
* Ward
* Registration status
* Verification date

It should NOT expose:

* Phone numbers
* Email addresses
* Passport photograph
* Private documents
* Internal notes

The QR code makes forged documents substantially easier to detect.

---

# 27. Document download page

After approval, the registrant should see:

**Registration Approved**

Registration Number:

**APCSC-KW-2026-000001**

Available documents:

* [Download Certificate of Registration]
* [Download Letter of Recognition]

Then:

**Join the APC Stakeholders Congress WhatsApp Group**

[Join WhatsApp Group]

The WhatsApp button should use the official supplied group link.

---

# 28. Re-download functionality

Approved users must be able to return later and retrieve their documents.

The dashboard should contain:

### My registration

Status:

**VERIFIED**

Registration number:

**APCSC-KW-2026-000001**

Documents:

* Certificate
* Letter of Recognition

Actions:

* Download
* Download again
* View registration
* Update permitted information

Document downloads should be logged.

---

# 29. Authentication

The system should not rely entirely on a public download URL.

A registrant should authenticate using a secure method.

Recommended initial approach:

**Phone number + OTP**

Alternative:

**Email + password / magic link**

For Nigeria-first usability, phone OTP is likely to be easier.

However, OTP costs money.

Therefore the architecture should allow:

* SMS OTP
* Email OTP
* Password login

without forcing a single provider.

---

# 30. Public verified groups directory

The directory should only expose information approved for public visibility.

Possible public fields:

* Forum name
* Focus area
* State
* LGA
* Ward
* Registration number
* Verification status
* Registration date
* Optional public contact method

Private leadership contact details should not automatically be public.

---

# 31. Search and filters

The directory should support:

* Search by forum name
* State
* Senatorial district
* LGA
* Ward
* Focus area
* Verification status

For Kwara MVP, State can be fixed to Kwara.

---

# 32. Focus areas

The system should support configurable focus areas.

Initial values:

* Women
* Youth
* Professionals
* PLWD
* Media
* Students
* Voter Mobilization
* Community Development
* Other

Administrators should be able to add new categories later.

Do not hard-code these categories throughout the application.

---

# 33. Admin dashboard

The admin dashboard is the operational heart of the system.

## Dashboard overview

Display:

* Total registrations
* Pending registrations
* Under review
* Correction required
* Approved
* Rejected
* Verified
* Total declared members
* Registrations by senatorial district
* Registrations by LGA
* Registrations by ward
* Registrations over time
* Focus areas
* Recent registrations

---

# 34. Registration management

Admin should have a table containing:

* Registration number
* Forum name
* Coordinator
* Secretary
* LGA
* Ward
* Area
* Membership strength
* Status
* Submitted date
* Last updated
* Assigned reviewer
* Actions

Actions:

* View
* Review
* Edit
* Request correction
* Approve
* Reject
* Download documents
* Generate documents
* Export
* View audit history

---

# 35. Advanced filtering

Administrators should be able to filter by:

* Status
* Date range
* LGA
* Ward
* Senatorial district
* Focus area
* Membership size
* Previous APC activity
* Support requested
* Document uploaded/not uploaded
* Reviewer
* Registration year

---

# 36. Bulk operations

Future-ready functionality should include:

* Bulk export
* Bulk status update where appropriate
* Bulk notification
* Bulk document generation
* Bulk download

Bulk approval should require strong confirmation because it has operational consequences.

---

# 37. Data export

The admin should be able to export:

### Excel

`.xlsx`

### CSV

`.csv`

### PDF

`.pdf`

Exports should respect permissions.

Sensitive information should not be included in general exports unless the administrator has permission.

---

# 38. Export presets

Create export presets such as:

### Forum directory

* Registration number
* Forum name
* LGA
* Ward
* Focus area
* Membership strength
* Status

### Leadership report

* Forum
* Coordinator
* Secretary
* Phone
* Email
* Location

### Membership report

* Forum
* Declared membership
* LGA
* Ward

### Support requirements

* Forum
* LGA
* Support requested
* Membership

This makes reporting dramatically easier.

---

# 39. CMS

The admin CMS should manage:

* Homepage content
* About page
* News
* Announcements
* Events
* Gallery
* Leadership
* Contact details
* Social links
* FAQs
* Footer
* Registration instructions
* Important notices

Administrators should not need a developer to change a phone number or publish an announcement.

---

# 40. News and updates

Admin should be able to create:

* News article
* Announcement
* Event
* Press release
* Success story

Fields:

* Title
* Slug
* Featured image
* Content
* Author
* Publish date
* Status
* Category
* Featured flag

Statuses:

* Draft
* Scheduled
* Published
* Archived

---

# 41. Notifications

The platform should support internal notifications.

Examples:

**Registration submitted**

**Registration under review**

**Correction required**

**Registration approved**

**Documents ready**

**New announcement**

**Important administrative update**

---

# 42. Communication architecture

The initial system should separate:

### In-app notifications

Cheap and immediate.

### Email

Useful for official communications.

### WhatsApp

Useful because of user behavior, but must comply with WhatsApp platform policies and appropriate business messaging requirements.

### SMS

Useful for critical transactional notifications but incurs cost.

The application should therefore use a notification abstraction layer rather than hard-code one provider.

---

# 43. WhatsApp integration

The supplied official group link is:

https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4

It should be stored in system settings rather than hard-coded into multiple pages.

Example configuration:

`official_whatsapp_group_url`

This allows administrators to change the group link without changing application code.

---

# 44. Security

Security is particularly important because the system collects personal information.

Sensitive data may include:

* Phone numbers
* Email addresses
* Passport photograph
* Leadership information
* Uploaded organizational documents

Security requirements:

* HTTPS
* Secure authentication
* Role-based access control
* Server-side authorization
* Input validation
* File validation
* Malware-safe upload strategy
* Rate limiting
* CSRF protection where applicable
* Secure cookies
* Encryption in transit
* Database encryption strategy where appropriate
* Secure secrets management
* Audit logs
* Automated backups
* Backup restoration testing

---

# 45. File upload security

Uploaded documents must never be treated as trustworthy.

The system should:

1. Validate extension.
2. Validate MIME type.
3. Validate actual file signature where possible.
4. Restrict file size.
5. Generate internal storage names.
6. Prevent executable files.
7. Store files outside the public web root where possible.
8. Serve them through authenticated access.
9. Log downloads.
10. Consider malware scanning.

The passport photograph should have strict size/type restrictions.

---

# 46. Data privacy

Because personal data is being collected, privacy must be designed into the product rather than added later.

The platform should have:

* Privacy Policy
* Terms of Use
* Data collection notice
* Consent mechanism
* Data retention policy
* Data access controls
* Data deletion/correction procedures
* Audit trail

The organization should obtain appropriate legal/privacy advice regarding its obligations under Nigeria's applicable data protection framework.

Do not collect sensitive information merely because it could theoretically be useful.

---

# 47. Sensitive information classification

The system should classify fields.

### Public

Potentially:

* Forum name
* LGA
* Ward
* Focus area
* Registration number
* Verification status

### Internal

* Leadership names
* Membership strength
* Support requirements
* Activity information

### Restricted

* Phone numbers
* Email
* Passport photograph
* Uploaded documents
* Administrative notes

### Highly restricted

Any future identity verification information.

---

# 48. Audit logging

Every important administrative action should be logged.

Examples:

* Registration created
* Registration edited
* Registration submitted
* Registration reviewed
* Correction requested
* Registration approved
* Registration rejected
* Document generated
* Document downloaded
* Admin login
* Admin role changed
* CMS article published
* Record exported

Audit entry:

* User
* Action
* Resource
* Timestamp
* IP where appropriate
* Previous value
* New value

Audit logs should be append-only from the normal admin interface.

---

# 49. Role-based access control

Suggested permissions:

## Super Admin

Everything.

## National Admin

Nationwide access.

## State Admin

State-specific access.

## Reviewer

Can review registrations but not configure the platform.

## Forum Admin

Can manage their forum.

## Member

Limited personal access.

## Content Editor

Can manage CMS content but cannot approve registrations.

This is better than having one giant "Admin" role.

---

# 50. Database architecture

Recommended database:

**PostgreSQL**

The application should use relational structures because the product has strongly related entities.

Core entities:

* users
* roles
* permissions
* states
* senatorial_districts
* lgas
* wards
* forums
* forum_leaders
* forum_activities
* forum_focus_areas
* forum_support_requests
* registrations
* registration_versions
* registration_reviews
* registration_status_history
* uploaded_documents
* document_templates
* generated_documents
* signatories
* signatures
* stamps
* announcements
* news_posts
* events
* galleries
* notifications
* audit_logs
* exports
* system_settings

---

# 51. Forum versus registration

Do not make the registration itself the permanent forum identity.

Use:

**Forum**

as the permanent organizational entity.

Then:

**Registration**

as a registration/application record.

This allows a forum to have:

* Original registration
* Renewed registration
* Updated registration
* Historical registrations

without destroying its identity.

This is a critical architectural distinction.

---

# 52. Registration versioning

A forum's information may change.

For example:

2026:

Coordinator = Person A

2027:

Coordinator = Person B

The system should preserve history.

Instead of overwriting the original record blindly:

**Forum**
→ Current information

**Registration version 1**
→ 2026 information

**Registration version 2**
→ updated information

This makes the system auditable.

---

# 53. Document storage

Generated documents should be stored against the registration/document record.

Example:

Forum:

`ABC Professionals Forum`

Registration:

`APCSC-KW-2026-000001`

Documents:

* Certificate v1
* Letter v1

If regenerated:

* Certificate v2
* Letter v2

The system should retain historical versions.

---

# 54. Recommended application architecture

A modern web application architecture is appropriate.

Recommended direction:

**Frontend + application layer:** Next.js / React

**Backend:** Next.js server-side architecture or dedicated Node.js API depending on project complexity

**Database:** PostgreSQL

**Authentication:** Secure OTP/password authentication

**Object storage:** S3-compatible storage

**PDF generation:** Server-side PDF/document rendering

**Email:** Transactional email provider

**SMS:** Provider abstraction with Termii or another suitable Nigerian provider

**Deployment:** Production-grade cloud infrastructure

The system should not be locked to a single hosting provider.

---

# 55. Why PostgreSQL

PostgreSQL is preferable because the platform will eventually contain:

* hierarchical locations
* relationships between forums and leaders
* registration history
* permissions
* audit logs
* document records
* reporting
* potentially millions of records

A relational database is the right tool.

This is not a spreadsheet pretending to be a database.

---

# 56. Mobile-first design

The majority of registrants are likely to access the service through smartphones.

Therefore:

**Mobile-first is mandatory.**

The registration form should work comfortably on:

* Android Chrome
* Android browsers
* iPhone Safari
* WhatsApp in-app browser where supported

Avoid:

* tiny fields
* desktop-only tables
* complex hover interactions
* huge image uploads
* unnecessary animations

---

# 57. Registration UX

The form should show:

**Step 1 of 7**

and a progress indicator.

At each stage:

* Save progress
* Continue
* Back
* Validation

Users should not lose everything because their browser closes.

A draft should be automatically saved where technically appropriate.

---

# 58. Review screen

Before submission:

## Review your information

### Forum details

Forum Name
Coordinator
Secretary
Area
LGA
Ward

### Contact

Phone
Email

### Structure

Activities
WhatsApp

### Track record

Previous APC activity
Role

### Support

Selected requirements

### Documents

Uploaded files

Then:

**I confirm that the information provided is accurate.**

**Submit registration**

---

# 59. Registration confirmation

After submission:

**Registration submitted successfully.**

Your registration number is:

**APCSC-KW-2026-000001**

Status:

**Under Review**

You will be notified when your registration has been reviewed.

Actions:

* View registration
* Save registration number
* Login to dashboard

---

# 60. Error handling

The system must use human-readable errors.

Bad:

`ValidationException: field forum_name invalid`

Good:

**Please enter the name of your forum.**

Bad:

`500 Internal Server Error`

Good:

**Something went wrong while submitting your registration. Your information has not been lost. Please try again.**

Errors should never expose technical details.

---

# 61. Admin review interface

A reviewer should see a clean two-column or sectioned review interface.

## Registration summary

* Registration number
* Date
* Status
* Reviewer
* Location

## Forum information

All submitted information.

## Uploaded documents

Preview/download.

## Verification controls

* Approve
* Request correction
* Reject

## Internal notes

Private reviewer notes.

## Audit history

Chronological record of actions.

---

# 62. Approval safeguards

Approval should require confirmation.

Example:

**Approve registration?**

This will:

* Mark the forum as verified
* Generate official registration documents
* Make approved public information eligible for directory publication
* Notify the registrant

Buttons:

**Cancel**

**Approve and generate documents**

---

# 63. Rejection safeguards

Rejection should require a reason.

Possible categories:

* Duplicate registration
* Insufficient information
* Invalid documentation
* Incorrect location
* Unable to verify
* Other

Administrator should be able to add notes.

---

# 64. Analytics

Initial dashboard analytics:

### Registration volume

Registrations by:

* Day
* Week
* Month

### Geographic distribution

By:

* Senatorial district
* LGA
* Ward

### Forum categories

By focus area.

### Membership

Total declared membership.

### Status

* Pending
* Under review
* Correction
* Verified
* Rejected

---

# 65. Data visualization

Use charts only where they communicate useful information.

Recommended:

* Registration trend line
* LGA distribution
* Senatorial district distribution
* Forum focus-area distribution
* Verification funnel

Avoid turning the dashboard into a Christmas tree of charts.

Every visualization should answer a question.

---

# 66. Reporting

Administrators should be able to generate:

### State report

Total registered forums across Kwara.

### Senatorial district report

Forums by:

* Central
* North
* South

### LGA report

Forums by LGA.

### Ward report

Forums by Ward.

### Membership report

Declared membership strength.

### Verification report

Verified/unverified breakdown.

### Support requirement report

Requested support categories.

---

# 67. CMS content architecture

The CMS should separate content from application logic.

Editable content:

* Hero headline
* Hero subtitle
* About
* Vision
* Mission
* Objectives
* Core values
* Contact
* Phone numbers
* Email
* WhatsApp link
* Social media
* Footer

This allows the organization to update information without developer intervention.

---

# 68. Media library

Admin should have a media library for:

* Logos
* Leadership photos
* Event photos
* Gallery images
* News images
* Document templates
* Signature assets
* Stamp assets

Each asset should have:

* Filename
* Type
* Size
* Upload date
* Uploader
* Usage reference

---

# 69. Branding

The website should use the official APC Stakeholders Congress identity.

The design should be:

* Institutional
* Credible
* Clean
* Modern
* Mobile-first
* Accessible
* Nigerian
* Politically recognizable without becoming visually chaotic

Avoid excessive green gradients, random icons and generic political templates.

The website should look like a serious organizational platform.

---

# 70. Document branding

Documents should be visually stronger than the website.

The certificate should use:

* Official logo
* Consistent typography
* Formal borders
* Registration number
* Signature
* Stamp
* Verification QR

The Letter of Recognition should preserve the supplied official letterhead exactly unless the organization approves modifications.

---

# 71. Accessibility

Target:

**WCAG 2.2 AA**

Important requirements:

* Keyboard accessibility
* Sufficient contrast
* Proper labels
* Accessible form errors
* Screen-reader-friendly structure
* Touch-friendly controls
* Visible focus states
* Alt text for meaningful images

Accessibility is particularly important for PLWD users.

---

# 72. Performance

Target:

* Fast first load
* Optimized images
* Lazy loading
* CDN
* Compressed assets
* Minimal client-side JavaScript
* Server-side rendering where useful

The stated requirement of less than three seconds should be treated as a target, but actual performance must be measured using real devices and realistic Nigerian network conditions.

---

# 73. Progressive enhancement

The website should remain usable on slower networks.

Avoid making registration dependent on:

* heavy animations
* large background videos
* enormous JavaScript bundles

The registration form should prioritize function over visual spectacle.

---

# 74. Backup strategy

Backups should include:

* Database
* Uploaded documents
* Generated documents
* CMS content
* Configuration

Recommended approach:

* Automated daily database backups
* More frequent backups for critical production data where justified
* Separate backup storage
* Encryption
* Retention policy
* Periodic restoration testing

A backup that has never been restored is a theory, not a backup.

---

# 75. Disaster recovery

Define:

* Recovery Point Objective
* Recovery Time Objective
* Backup retention
* Restoration procedure
* Incident owner

The system should have documented recovery procedures.

---

# 76. Environment architecture

Use:

### Development

Local developer environment.

### Staging

Testing environment.

### Production

Live platform.

Secrets must never be committed to Git.

Use environment variables / secret management.

---

# 77. Deployment architecture

Initial production architecture can be:

User
↓
CDN / Edge
↓
Web application
↓
Application services
↓
PostgreSQL
↓
Object storage

External services:

* Email
* SMS
* WhatsApp/business messaging where applicable
* Monitoring

---

# 78. Observability

The system should have:

* Application error monitoring
* Server logs
* Database monitoring
* Authentication monitoring
* Failed upload monitoring
* Notification delivery monitoring
* Performance monitoring

Administrators should not need developer access to understand whether registrations are working.

---

# 79. Security monitoring

Monitor:

* Repeated failed logins
* OTP abuse
* Suspicious upload activity
* Unusual admin actions
* Bulk export activity
* Permission changes
* Excessive requests

Rate-limit public endpoints.

---

# 80. API architecture

Even if the first application is a monolith, internal APIs/services should have clean boundaries.

Core API domains:

### Authentication

* Login
* OTP
* Session
* Logout

### Registrations

* Create
* Update
* Submit
* Review
* Approve
* Reject
* Request correction

### Forums

* Retrieve
* Update
* Search

### Documents

* Generate
* Download
* Verify

### Locations

* States
* Districts
* LGAs
* Wards

### CMS

* News
* Events
* Gallery
* Pages

### Notifications

* In-app
* Email
* SMS

### Reports

* Generate
* Export

---

# 81. Public API security

Never expose internal administrative APIs directly.

Every endpoint must verify:

1. Authentication where required.
2. Authorization.
3. Resource ownership.
4. Input validation.
5. Rate limits.

Do not rely on frontend hiding buttons as a security mechanism.

If a user cannot see the "Admin" button but can call the admin endpoint manually, the system is not secure.

---

# 82. Database integrity

Use database constraints wherever possible.

Examples:

* Unique registration number
* Unique user email where appropriate
* Valid foreign keys
* Required relationships
* Controlled statuses
* Valid location references

Do not rely solely on frontend validation.

---

# 83. Data normalization

Do not store:

`Kwara North, Ilorin West, Ward 8`

as one text blob when the system needs to analyze these independently.

Store:

* state_id
* senatorial_district_id
* lga_id
* ward_id

Then display the human-readable names.

This is what makes future reporting possible.

---

# 84. National expansion

When nationwide deployment begins, administrators should be able to activate:

* State
* Senatorial district
* LGA
* Ward

through configuration.

The system should not require a rewrite.

Example:

Current:

`registration_state = Kwara`

Future:

`registration_state = any enabled Nigerian state`

---

# 85. Configuration-driven geography

Location data should be maintained in the database.

Example:

States:

* Kwara
* Lagos
* Oyo
* etc.

LGAs:

Belong to State.

Wards:

Belong to LGA.

Senatorial districts:

Belong to State.

This makes national expansion a data/configuration exercise rather than a code rewrite.

---

# 86. Feature flags

Future features should be controlled through feature flags/configuration.

Examples:

* nationwide registration
* member portal
* public directory
* SMS
* WhatsApp messaging
* support request module
* payment
* member management

This allows functionality to be activated gradually.

---

# 87. Admin settings

Create a system settings area containing:

### Organization

* Organization name
* Logo
* Contact
* Address
* Email
* Phone

### Registration

* Current state
* Registration prefix
* Registration year
* Required fields
* Allowed file types
* Maximum upload sizes

### Documents

* Certificate template
* Letter template
* Signatory
* Signature
* Stamp

### Communication

* WhatsApp URL
* Email provider
* SMS provider

### Geography

* Active states
* Active LGAs
* Active wards

---

# 88. Document template engine

Document templates should support placeholders.

Example:

`{{forum_name}}`

`{{registration_number}}`

`{{state}}`

`{{lga}}`

`{{ward}}`

`{{registration_date}}`

`{{signatory_name}}`

`{{signatory_title}}`

`{{signature}}`

`{{stamp}}`

`{{verification_qr}}`

This makes templates reusable.

---

# 89. Document generation workflow

When registration is approved:

1. Retrieve approved registration data.
2. Retrieve current approved template.
3. Retrieve appropriate signatory.
4. Retrieve signature.
5. Retrieve stamp.
6. Generate QR code.
7. Render document.
8. Generate PDF.
9. Store immutable document record.
10. Attach document to registration.
11. Notify registrant.

If generation fails, approval should not silently appear successful.

The system should report:

**Approved, but document generation failed. Administrator action required.**

---

# 90. Document verification page

Public route:

`/verify/[registrationNumber]`

Example:

`/verify/APCSC-KW-2026-000001`

Display:

**Verified Registration**

Forum:

**ABC Professionals Forum**

Location:

**Kwara State → Ilorin West → Ward X**

Registration number:

**APCSC-KW-2026-000001**

Status:

**Verified**

Verification date:

**DD Month YYYY**

Avoid exposing private personal information.

---

# 91. Admin document controls

Administrators should be able to:

* Generate
* Regenerate
* Download
* Revoke
* View version
* View generation date

If a document is revoked, the verification page should reflect:

**Document revoked**

rather than continuing to say "verified."

---

# 92. Data export security

Export functionality is powerful and dangerous.

Require:

* Permission
* Confirmation
* Export type
* Optional date/location filter
* Export logging

Every export should create an audit record.

Example:

**Admin X exported 1,245 forum records containing leadership contact data.**

---

# 93. Admin dashboard navigation

Recommended:

**Dashboard**

**Registrations**

* All
* Pending
* Under Review
* Corrections
* Verified
* Rejected

**Forums**

**Documents**

**Locations**

**Reports**

**Notifications**

**News & CMS**

**Media**

**Users & Roles**

**Audit Logs**

**Settings**

---

# 94. Forum dashboard

After authentication, a forum representative should see:

### Registration

Status:

**Verified**

Registration number:

**APCSC-KW-2026-000001**

### Documents

* Certificate
* Letter of Recognition

### Profile

Forum information.

### Notifications

Latest official messages.

### Support

Current support information if enabled.

---

# 95. Membership architecture

The initial registration form only captures:

**Total number of registered members**

It should not force full member-level registration in MVP.

However, the database should be capable of supporting:

**Forum → Members**

later.

Future member records could contain:

* Name
* Phone
* Gender where legally/business-appropriate
* LGA
* Ward
* Membership ID
* Registration date
* Status

This should be a separate module.

Do not unnecessarily collect thousands of individual member records during the first release.

---

# 96. Membership import

The PRD mentioned Excel membership uploads.

This should be treated as a later module unless the organization explicitly requires it for launch.

If implemented:

* Provide downloadable Excel template.
* Validate columns.
* Detect duplicates.
* Preview before import.
* Show row-level errors.
* Allow correction.
* Never blindly insert thousands of rows.

---

# 97. Registration documents

Initial upload:

**Forum Resolution Letter**

Future documents may include:

* Constitution
* Letter of support
* CAC certificate
* Meeting minutes
* Other approved documentation

The upload architecture should therefore be generic.

---

# 98. File naming

Do not rely on user-provided filenames.

Internal storage example:

`registration/{registration_id}/documents/{uuid}.pdf`

Display name:

**Forum Resolution Letter.pdf**

This avoids filename collisions and malicious filenames.

---

# 99. Email communication

Transactional emails should include:

### Registration received

Registration number and status.

### Correction required

What needs to be corrected.

### Approved

Documents are available.

### Important announcement

Official update.

Email templates should be editable or at least centrally managed.

---

# 100. Notification history

Users should have a notification center.

Each notification:

* Title
* Message
* Date
* Read/unread
* Type
* Related resource

Examples:

**Registration approved**

**Correction required**

**New announcement**

---

# 101. Public contact page

Contact information supplied:

**Email:** [apcstakeholderscongress@gmail.com](mailto:apcstakeholderscongress@gmail.com)

**Phone:**

07030592380
08032010479

**Address:**

APC Kwara North House, Fate Road, Ilorin, Kwara State.

Contact form:

* Name
* Email
* Phone
* Subject
* Message
* State

Add:

**WhatsApp Support**

where an approved official WhatsApp number is available.

---

# 102. Content governance

The CMS should distinguish:

* Draft
* Published
* Archived

Publishing should record:

* Author
* Publisher
* Date
* Version

Important official statements should be editable only by authorized roles.

---

# 103. SEO

Public pages should have:

* Page titles
* Meta descriptions
* Open Graph metadata
* Structured URLs
* Sitemap
* Robots configuration
* Canonical URLs
* Organization structured data where appropriate

Potential routes:

`/`

`/about`

`/register`

`/groups`

`/groups/[slug]`

`/news`

`/news/[slug]`

`/events`

`/gallery`

`/contact`

`/verify/[registrationNumber]`

---

# 104. Search engine privacy

Do not index:

* Admin dashboard
* Registration records
* Private member pages
* Document downloads
* Private verification details

Public group pages can be indexed only if the organization intentionally wants that.

---

# 105. Legal pages

Initial website should contain:

* Privacy Policy
* Terms of Use
* Registration Declaration
* Document Verification Disclaimer

The privacy policy should accurately describe the actual data collected.

Do not copy a generic Silicon Valley privacy policy and pretend it covers Nigerian operations.

---

# 106. Political and organizational disclaimer

The website may include the organization's supplied disclaimer that the platform represents an independent support structure of the All Progressives Congress.

The exact legal positioning should be approved by the organization's leadership/legal adviser.

Do not make claims about official APC institutional status unless the organization is authorized to make them.

---

# 107. Content supplied by client

The following should be treated as client-provided content pending final approval:

* Organization description
* Aim
* Vision
* Mission
* Objectives
* What We Do
* Core Values
* Contact information
* Hero messaging
* Registration form
* WhatsApp group link

The application should make content editable where practical.

---

# 108. Design system

Create a dedicated design system before building every page independently.

Define:

* Colors
* Typography
* Buttons
* Inputs
* Selects
* Cards
* Tables
* Status badges
* Alerts
* Modal dialogs
* Navigation
* Pagination
* File upload
* Progress indicators
* Empty states
* Loading states
* Error states

---

# 109. Status colors

Status should never depend on color alone.

Examples:

**Pending**

Pending badge + icon + text.

**Under Review**

Review badge + text.

**Correction Required**

Warning icon + text.

**Verified**

Check icon + text.

**Rejected**

Error icon + text.

This improves accessibility.

---

# 110. Empty states

Every dashboard section should have meaningful empty states.

Example:

**No registrations yet**

When forums begin registering, they will appear here.

Avoid blank screens.

---

# 111. Loading states

Use skeletons or meaningful loading indicators.

Forms should show:

**Submitting registration...**

Do not allow double submission.

---

# 112. Double-submission protection

The submit button must become disabled after submission begins.

The backend should also use idempotency protection where appropriate.

This prevents:

`Submit → tap twice → two registrations`

---

# 113. Registration security

The application should use:

* CSRF protection where applicable
* Rate limiting
* CAPTCHA or bot protection where justified
* OTP rate limits
* Session expiration
* Secure cookies
* Brute-force protection

---

# 114. Admin security

Administrative accounts should have stronger security.

Recommended:

* Strong passwords
* MFA
* Session timeout
* Login alerts
* Device/session management
* Role-based permissions
* Audit logs

MFA should be considered mandatory for Super Admin accounts.

---

# 115. Testing strategy

The project should have automated tests.

## Unit tests

Test:

* Registration validation
* Registration number generation
* Permission logic
* Document placeholders
* Status transitions

## Integration tests

Test:

* Registration submission
* Authentication
* Approval workflow
* Document generation
* Notifications

## End-to-end tests

Test:

**Registrant → registration → admin review → approval → document download**

This is the most important end-to-end flow.

---

# 116. Security testing

Before production:

* Dependency scanning
* SAST
* Authentication testing
* Authorization testing
* File upload testing
* API security testing
* Rate-limit testing
* OWASP Top 10 review

Potential tooling:

* Semgrep
* CodeQL
* OWASP ZAP

---

# 117. Acceptance criteria

The MVP is not complete until:

### Registration

* User can register.
* Required fields validate.
* Draft protection works where implemented.
* Registration number is generated.
* Confirmation appears.

### Admin

* Admin sees submission.
* Admin can review.
* Admin can request correction.
* Admin can approve.
* Admin can reject.

### Documents

* Approved registration generates certificate.
* Approved registration generates letter.
* Correct information appears.
* Signature appears.
* Stamp appears.
* Registration number appears.
* PDF downloads correctly.
* Documents remain available.

### Verification

* QR code works.
* Public verification page works.
* Revoked documents are reflected correctly.

### Reports

* Excel export works.
* CSV export works.
* PDF export works.
* Filters work.

### CMS

* Admin can publish announcement.
* Published content appears publicly.

### Security

* Unauthorized users cannot access private registration data.
* Forum users cannot access another forum's data.
* Admin permissions work.
* Uploaded documents are protected.

---

# 118. MVP release definition

The first production release should include:

## Public

* Homepage
* About
* Registration
* Registration status
* Verified Groups
* News/Updates
* Contact
* Login

## Registrant

* Account
* Registration
* Status
* Correction workflow
* Document downloads
* Notification center

## Admin

* Dashboard
* Registration management
* Verification
* Document management
* Reports
* Exports
* CMS
* Users/Roles
* Settings
* Audit logs

## Infrastructure

* PostgreSQL
* Secure file storage
* Authentication
* Document generation
* PDF generation
* Email notifications
* Backup
* Monitoring

---

# 119. Phase 2

Potential additions:

* Member management
* Excel member imports
* SMS notifications
* WhatsApp Business messaging
* Activity reporting
* Events management
* Advanced analytics
* Forum activity scoring
* Support request management
* State administrators

---

# 120. Phase 3

Potential nationwide expansion:

* Multiple states
* State-specific administrators
* National dashboard
* National reports
* State-level configuration
* State-specific document templates
* State-specific registration prefixes
* Nationwide directory
* National communications

---

# 121. Phase 4

Potential advanced platform capabilities:

* Member IDs
* Digital membership cards
* QR membership verification
* Forum activity history
* Event attendance
* Training management
* Resource distribution tracking
* Advanced organizational analytics

These should only be built after the basic registry is stable.

---

# 122. Recommended implementation order

Do not build pages randomly.

Build in this sequence:

## Foundation

1. Repository
2. Architecture
3. Environment configuration
4. Database
5. Authentication
6. RBAC
7. Location hierarchy
8. Storage
9. Audit logging

## Registration

10. Registration schema
11. Multi-step form
12. Validation
13. Draft persistence
14. Submission
15. Registration numbering
16. Status engine

## Admin

17. Dashboard
18. Registration list
19. Registration review
20. Correction workflow
21. Approval/rejection
22. Search/filter

## Documents

23. Certificate template
24. Letter template
25. Signatory system
26. Signature/stamp
27. PDF generation
28. QR verification
29. Download/re-download

## CMS

30. Pages
31. News
32. Announcements
33. Gallery
34. Media library

## Reporting

35. Excel export
36. CSV export
37. PDF reports
38. Analytics

## Hardening

39. Security testing
40. Performance testing
41. Mobile testing
42. Backup testing
43. Production deployment

---

# 123. Recommended first database entities

The minimum relational model should include:

```text
users
roles
permissions
role_permissions
user_roles

states
senatorial_districts
lgas
wards

forums
forum_contacts
forum_leaders
forum_focus_areas
forum_activities
forum_support_requests

registrations
registration_versions
registration_status_history
registration_reviews

documents
document_templates
generated_documents
signatories

notifications

news_posts
events
gallery_items
media_assets

system_settings
audit_logs
exports
```

---

# 124. Critical architectural rules

The implementation team/AI agent must obey these rules:

### Rule 1

Do not hard-code Kwara throughout the application.

Kwara is the initial active state, not the architecture.

### Rule 2

Do not hard-code forum categories.

Store them in the database/configuration.

### Rule 3

Do not hard-code document signatories.

Use configurable signatory records.

### Rule 4

Do not overwrite historical registrations.

Use versioning.

### Rule 5

Do not expose private registration data publicly.

### Rule 6

Do not trust frontend authorization.

Enforce permissions server-side.

### Rule 7

Do not store uploaded documents as publicly accessible files.

### Rule 8

Do not make the certificate a static image with manually edited text.

Use a reusable template.

### Rule 9

Do not make the Letter of Recognition dependent on a developer manually editing the letterhead.

Use a document template.

### Rule 10

Do not make the database schema mirror the visual form blindly.

Model the actual domain.

### Rule 11

Do not build national features into the UI before they are needed.

Build the architecture for them, then expose them through configuration.

### Rule 12

Every critical action must be auditable.

---

# 125. Certificate design decision

The recommended approach is:

**Design the certificate once as an official master template.**

The design should contain:

* Logo
* Border
* Background elements
* Decorative elements
* Organization name
* Certificate title
* Signature area
* Stamp area
* QR area
* Dynamic field placeholders

The application injects:

* Forum name
* Registration number
* Location
* Date
* Signatory
* Signature
* Stamp
* QR

This gives the organization a consistent certificate regardless of how many forums register.

---

# 126. Letterhead decision

The supplied official letterhead should be uploaded as the official Letter of Recognition template.

The document generator should add the dynamic body content and authorized signature/stamp.

The letterhead should be versioned.

If the organization redesigns its letterhead in the future:

**Template v1**

remains attached to old documents.

**Template v2**

is used for new documents.

---

# 127. Official signatory system

Admin settings should provide:

**Current authorized signatory**

* Name
* Position
* Signature
* Stamp
* Start date
* End date
* Active/inactive

This is better than uploading the DG's signature directly into application code or embedding it permanently into the PDF template.

---

# 128. Registration document integrity

Generated documents should include a unique identifier.

Recommended:

**Registration Number + QR verification**

This creates a simple authenticity mechanism.

Example:

Someone receives:

`APCSC-KW-2026-000001`

They scan the QR.

The website confirms whether that registration is genuine and currently valid.

---

# 129. Admin document regeneration

If an administrator discovers an error:

1. Correct the registration record.
2. Record the change.
3. Regenerate the documents.
4. Mark previous document versions appropriately.
5. Create new document version.
6. Preserve the old version in the audit history.

Do not silently replace documents.

---

# 130. Data ownership

The organization should retain ownership of:

* Registration data
* Uploaded documents
* Generated documents
* CMS content
* Media
* Database
* Domain
* Source code
* Deployment credentials
* API accounts

Avoid vendor lock-in.

The organization should be able to migrate the platform later.

---

# 131. Domain and infrastructure ownership

Production infrastructure should be registered under organizational accounts where possible.

At minimum:

* Domain
* Hosting
* Database
* Storage
* Email
* SMS
* Analytics
* Source repository

should not permanently depend on a developer's personal account.

---

# 132. Admin operational principle

The system should be usable by a non-technical administrator.

If an administrator needs a developer every time they want to:

* change a phone number
* publish an announcement
* download a report
* regenerate a document
* change the WhatsApp link

the CMS has failed.

---

# 133. Design philosophy

The website should communicate:

**Credibility → Organization → Accessibility → Action**

rather than:

**Political poster → flashy animations → giant slogans → clutter**

The platform's most important job is trust.

A forum leader should feel comfortable entering organizational information because the system looks legitimate, predictable and secure.

---

# 134. Primary success metrics

Track:

### Registration

* Number of started registrations
* Completion rate
* Submission rate
* Correction rate
* Approval rate

### Geography

* Forums by LGA
* Forums by ward
* Forums by senatorial district

### Data

* Total declared membership
* Forum categories
* Support requests

### Operations

* Average review time
* Average correction time
* Document generation success rate

### Platform

* Mobile completion rate
* Page performance
* Error rate
* Authentication success rate

---

# 135. Key product insight

The public website is only the visible layer.

The real product is:

**Structured organizational data + verification workflow + document engine + administrative CMS.**

The homepage is important.

But the database and workflow are more important.

A beautiful homepage with a broken registration system is a digital billboard.

A reliable registration and verification engine becomes infrastructure.

---

# 136. Final product architecture

At a high level:

```text
                    PUBLIC WEBSITE
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
     ABOUT            REGISTRATION      VERIFIED GROUPS
        │                 │                 │
        │                 ▼                 │
        │          REGISTRATION ENGINE      │
        │                 │                 │
        │          ┌──────┴──────┐          │
        │          │             │          │
        │       VALIDATION     DATABASE     │
        │                        │          │
        │                        ▼          │
        │                  REVIEW WORKFLOW  │
        │                        │          │
        │                  ┌─────┴─────┐    │
        │                  │           │    │
        │               APPROVED    REJECTED│
        │                  │                │
        │                  ▼                │
        │            DOCUMENT ENGINE        │
        │             │            │        │
        │        CERTIFICATE    LETTER      │
        │             │            │        │
        │             └─────┬──────┘        │
        │                   │               │
        │                   ▼               │
        │              QR VERIFICATION      │
        │                                   │
        └──────────────┬────────────────────┘
                       │
                       ▼
                 ADMIN DASHBOARD
                       │
       ┌───────────────┼────────────────┐
       │               │                │
   REGISTRATIONS     REPORTS           CMS
       │               │                │
       ▼               ▼                ▼
   VERIFICATION      EXPORTS        NEWS/UPDATES
       │
       ▼
    AUDIT LOG
```

---

# 137. Definition of done

The project should be considered production-ready only when a real user can complete this entire journey without developer intervention:

```text
Visit website
      ↓
Read about Congress
      ↓
Click Register Your Forum
      ↓
Complete registration
      ↓
Upload resolution letter
      ↓
Review information
      ↓
Submit
      ↓
Receive registration number
      ↓
Administrator reviews
      ↓
Correction requested if necessary
      ↓
Registrant corrects information
      ↓
Administrator approves
      ↓
Certificate generated
      ↓
Letter of Recognition generated
      ↓
Registrant logs in
      ↓
Downloads both documents
      ↓
Scans QR code
      ↓
Verification page confirms authenticity
      ↓
Registrant joins official WhatsApp group
```

If that workflow works reliably, the core product works.

Everything else is secondary.

---

# 138. Final implementation principle

Build this as **nationwide infrastructure disguised as a Kwara MVP**.

Do not build:

> "A Kwara website that we will later somehow make nationwide."

Build:

> "A nationwide registration platform whose first enabled jurisdiction is Kwara State."

That distinction will save substantial redevelopment when the organization expands.

The first release should therefore be narrow in **scope**, but broad in **architecture**.

The correct foundation is:

**Structured data → controlled workflow → verification → immutable documents → auditability → reporting → scalable geography.**

The website is merely the front door.
