# APC Stakeholders Congress Portal - Project Blueprint

**Document status:** Master implementation blueprint  
**Version:** 1.0  
**Initial jurisdiction:** Kwara State, Nigeria  
**Future scope:** Nationwide expansion

## 1. Executive summary

The APC Stakeholders Congress Portal is a production-oriented web platform for capturing and managing structured information about forums, associations, and support groups working with the APC Stakeholders Congress.

The first release is deliberately restricted to **Kwara State**. The architecture must nevertheless be designed so nationwide expansion can later be enabled through data and configuration rather than rebuilding the application.

The platform has two major surfaces:

1. **Public website** - organization information, forum registration, approved public groups, news, updates, events, gallery and contact.
2. **Secure administration system** - registrations, verification, documents, reports, users, content, notifications and audit history.

The central workflow is:

**Forum representative → Registration → Submission → Review → Verification/Approval → Certificate + Letter of Recognition → Secure re-download → Ongoing administration**

The platform is not merely a brochure website. Its core asset is a structured, trustworthy registry.

## 2. Business objectives

The system must:

- build a centralized registry of forums and associations
- capture standardized organizational and geographic information
- establish a controlled verification workflow
- automatically issue approved registration documents
- let representatives retrieve documents again securely
- provide administrators with a management dashboard
- generate operational and leadership reports
- publish official announcements and updates
- support communication with registered groups
- provide a foundation for eventual nationwide expansion

## 3. Initial scope

### Jurisdiction

**Kwara State only.**

The initial system must support:

- Kwara North
- Kwara Central
- Kwara South
- all Kwara LGAs
- all relevant wards
- North Central geopolitical zone

Geographic values must come from controlled reference data, not arbitrary frontend text.

### Future scope

The same data model should support:

**Nigeria → Geopolitical Zone → State → Senatorial District → LGA → Ward → Forum**

Nationwide expansion should be achieved by adding/activating geographic data and administrators, not rewriting core business logic.

## 4. Product principles

### Data first

The registry is the heart of the product. Accuracy, consistency, privacy, traceability and auditability take priority over flashy features.

### Mobile first

Most registrants are expected to use smartphones and may arrive through WhatsApp. The registration experience must work well on mobile networks with limited bandwidth.

### Verification before trust

A submitted registration is not a verified organization.

Canonical statuses:

- Draft
- Submitted
- Under Review
- More Information Required
- Approved / Verified
- Rejected
- Suspended / Revoked

### Least privilege

Users see and modify only what their role permits.

### Configuration over hard-coding

Organization information, geography, document templates, signatories, social links, notification providers and similar changeable values should be configurable.

### Future-proof, not over-engineered

Build the foundation for nationwide scale, but do not build unnecessary nationwide complexity into the first release.

## 5. Organization information

**Official name:** APC Stakeholders Congress

**Current chapter:** Kwara State

**Email:** apcstakeholderscongress@gmail.com

**Phone:** 07030592380, 08032010479, 07031693124

**Address:** APC Kwara North House, Fate Road, Ilorin, Kwara State.

**WhatsApp group/community:**
https://chat.whatsapp.com/GbP3WPz0aOKKGTokyEAmRZ

The WhatsApp URL should be editable through the CMS.

### Stated aim

To serve as a united, strategic and credible body of committed APC members that will mobilize, coordinate, and provide support for the growth, sustainability, and electoral success of the All Progressives Congress at Ward, LGA, State, and National levels.

### Vision

A united, vibrant, and winning APC driven by active stakeholders committed to progressive governance, national development, and the ideals of the party.

### Mission

To mobilize, coordinate, and empower APC support groups and forums through a centralized platform promoting unity, effective communication, capacity building, and grassroots engagement.

### Core values

**Unity | Loyalty | Service | Integrity | Grassroots First | Party Supremacy**

## 6. User roles

### Forum representative

Usually Chairman, President, Coordinator or Secretary.

Can:

- register a forum
- provide information
- upload documents
- check registration status
- retrieve approved documents
- update permitted information

### Verification officer

Can:

- review submissions
- inspect documents
- request more information
- add internal notes
- recommend or perform approval depending on permission

### State administrator

Can:

- manage Kwara registrations
- supervise verification
- manage forum records
- generate reports
- manage approved communications

### Super administrator

Full administration including:

- users
- roles
- permissions
- system configuration
- document templates
- authorized signatories
- audit logs
- CMS
- reports

### Content editor

Can manage:

- news
- announcements
- events
- gallery
- public content

Does not automatically receive access to sensitive registration data.

### Reporting viewer

Read-only access to approved reports and dashboards.

## 7. Public website

### Navigation

- Home
- About Us
- Register Your Forum
- Registration Status
- Verified Groups
- News & Updates
- Events & Gallery
- Get Involved
- Contact

Secondary:

- Privacy Policy
- Terms
- Disclaimer

### Homepage

Hero headline:

**UNITING APC STAKEHOLDERS FOR VICTORY 2027**

Subheadline:

**The official platform for all APC forums, associations, and support groups to register, connect, and mobilize for party growth and national development.**

Primary CTA:

**Register Your Forum**

Secondary CTAs:

- Check Registration Status
- Join the Congress

The homepage must clearly state that registration is currently available in **Kwara State**.

Sections:

1. Hero
2. Who We Are
3. Mission / Vision
4. What We Do
5. Geographic coverage
6. Registration CTA
7. Verified Groups preview
8. Latest announcements
9. Events/gallery
10. Get involved
11. Contact
12. Footer

## 8. Registration system

The registration system is the primary product workflow.

### Captured information

#### Forum details

- Forum name
- Coordinator name
- Secretary name
- Area of coverage
- LGA
- Ward
- Office address
- Year established
- Total member strength

#### Contact

- Coordinator phone
- Secretary phone
- Forum email
- Social media handles
- Coordinator passport photograph

#### Structure

- Key activities
- Other activity
- WhatsApp availability
- WhatsApp group link

#### Political track record

- Previous APC election participation
- Role played
- APC leader/sponsor alignment

#### Commitment

- Commitment to work for APC candidates in 2027
- Agreement to work with APC Stakeholders Congress
- Declaration
- Data-processing consent

#### Support needed

- Training
- Logistics
- Branded materials
- Data/sensitization materials
- Financial support
- None for now

Meeting/training willingness:

- Yes
- No
- Maybe

#### Documents

- Forum Resolution Letter
- Additional supporting documents if enabled

The detailed field specification is maintained in `01_form.md`.

## 9. Registration UX

Use a multi-step wizard:

1. Forum Details
2. Location
3. Contact
4. Structure
5. Track Record
6. Commitment
7. Support
8. Documents
9. Review
10. Submit

Requirements:

- progress indicator
- mobile-first layout
- clear required-field indicators
- inline validation
- server-side validation
- upload progress
- draft preservation where practical
- review-before-submit
- useful error messages
- no destructive loss of entered data

## 10. Registration reference

Every submission receives a unique public reference.

Suggested format:

**APCSC-KW-2026-XXXXXX**

This is a proposal and must be approved by the organization.

Do not expose sequential database IDs as public identifiers.

## 11. Verification workflow

### Submission

The system:

- validates data
- stores the application
- assigns reference number
- stores files securely
- records timestamps
- sends confirmation

### Review

Authorized personnel inspect:

- forum information
- leadership
- geographic location
- activities
- supporting documents
- declared history

### More information

If incomplete:

- change status to More Information Required
- record what is needed
- notify registrant
- accept additional information
- return to review

### Approval

Only authorized approvers can approve.

On approval:

- record approving user
- record timestamp
- generate certificate
- generate letter of recognition
- enable secure document retrieval
- optionally publish the forum in the verified directory

### Rejection

A reason should be recorded.

Rejected records must not appear in the public verified directory.

## 12. Certificate generation

Create **one professionally designed master certificate template**.

Do not manually design a certificate for each forum.

### Static elements

- official logo
- certificate title
- visual identity
- border/background
- official seal/stamp
- authorized signature area

### Dynamic fields

- forum name
- registration number
- LGA
- State
- issue date
- signatory name
- signatory title
- verification code
- QR code if enabled

The authorized signatory's signature can be stored as a protected asset if the organization explicitly authorizes its digital use.

Raw signature and stamp assets must never be publicly accessible.

## 13. Letter of Recognition

The supplied official letterhead is the master template.

Dynamic fields may include:

- date
- forum name
- address
- registration number
- recognition statement
- LGA
- State
- authorized officer
- signature
- stamp

The letter must be generated only after the required approval.

Use print-quality assets.

## 14. Document versioning

Each generated document records:

- document ID
- forum ID
- document type
- document number
- template version
- generation timestamp
- issuing administrator
- checksum
- status

Previously issued documents must remain historically reproducible.

Updating a template must not silently alter old documents.

If a document is revoked or reissued, retain the history.

## 15. QR verification

A QR code is strongly recommended for certificates.

Conceptual route:

`/verify/{token}`

Public verification should reveal only:

- forum name
- registration number
- State
- LGA
- issue date
- verification status
- document type

Never put sensitive data in the QR payload.

Possible verification results:

- Valid
- Revoked
- Superseded
- Not Found

## 16. Document re-download

After approval, the representative must be able to download the two documents again.

Recommended flow:

1. Open Registration Status.
2. Enter registration reference.
3. Complete appropriate verification.
4. View current status.
5. Download certificate and letter.
6. Log the download.

Use authorization and/or signed, time-limited download URLs.

Do not use predictable public document URLs.

## 17. Verified Groups Directory

Only approved/verified forums are displayed.

Search/filter:

- Forum name
- LGA
- Ward
- activity/focus
- senatorial district
- area of coverage

Potential public profile fields:

- Forum name
- category/activity
- LGA
- Ward if approved
- area of coverage
- verification status
- registration date if desired

Never publish:

- NIN
- bank details
- private phone numbers
- private documents
- internal notes
- identity documents

## 18. Admin dashboard

Dashboard metrics:

- Total registrations
- Pending
- Under Review
- More Information Required
- Verified
- Rejected
- Suspended
- Registrations by LGA
- Registrations by senatorial district
- Registrations by activity
- Declared member strength
- Recent submissions
- Recent administrative activity

### Registration table

Recommended columns:

- Registration number
- Forum name
- LGA
- Ward
- Coordinator
- Secretary
- member strength
- status
- submitted date
- assigned reviewer
- actions

Use server-side filtering and pagination.

## 19. Forum administration

Authorized administrators can:

- search
- filter
- view complete record
- inspect uploaded documents
- add internal notes
- request information
- approve
- reject
- suspend/revoke
- reinstate where authorized
- update permitted administrative information
- export

All important actions must be audited.

## 20. CMS

Content types:

### Announcements

- title
- summary
- body
- audience
- publish date
- expiry date
- attachment
- author
- status

### News

- title
- slug
- excerpt
- body
- featured image
- category
- author
- publish date
- status

### Events

- title
- description
- date/time
- venue
- LGA
- registration/contact information
- cover image
- status

### Gallery

- album
- media
- caption
- location
- date
- status

Editorial workflow:

**Draft → Review → Published → Archived**

## 21. Notifications

Provider-independent notification architecture should support:

- Email
- SMS
- WhatsApp through an approved official API/provider
- in-app notifications

Events:

- registration received
- information requested
- registration approved
- registration rejected
- documents ready
- announcement published
- event reminder

Do not build production communications around unofficial WhatsApp Web automation.

The supplied WhatsApp link can be used as a normal CTA.

## 22. Reporting

Reports:

- total registrations
- registrations by status
- registrations by date
- registrations by LGA
- registrations by senatorial district
- registrations by area
- registrations by activity
- declared member strength
- training demand
- support requirements
- physical-meeting willingness
- WhatsApp availability
- approval/rejection rates
- review duration
- information requests

## 23. Exports

Support:

- XLSX
- CSV
- PDF

Export jobs must:

- enforce permissions
- respect filters
- record actor
- record timestamp
- record filters
- exclude sensitive fields by default
- optionally watermark official PDF reports

Large exports should use background jobs.

## 24. Database architecture

Recommended database:

**PostgreSQL**

Core entities:

- states
- geopolitical_zones
- senatorial_districts
- lgas
- wards
- forums
- forum_contacts
- forum_activities
- forum_commitments
- forum_documents
- generated_documents
- users
- roles
- permissions
- role_permissions
- announcements
- events
- gallery_items
- notifications
- audit_logs

The detailed model is in `03_data_model.md`.

## 25. Geographic architecture

Do not hard-code Kwara geography into business logic.

Use reference tables:

- geopolitical zones
- states
- senatorial districts
- LGAs
- wards

Initial seed:

**Kwara State → North Central → Kwara Central/North/South → 16 LGAs → wards**

The exact LGA/ward dataset must be verified against an authoritative source before production.

## 26. Nationwide expansion

The platform should support:

**Country → Zone → State → Senatorial District → LGA → Ward → Forum**

Future administrators can be scoped to jurisdictions.

Nationwide expansion should primarily involve:

- adding geographic records
- enabling states
- assigning administrators
- expanding filters
- configuring national workflows

Avoid a future rewrite.

## 27. Data privacy

The system handles personal information and must implement data minimization.

The original brainstormed concept mentioned NIN and bank details. **Do not collect either in the MVP without an explicit operational requirement and appropriate legal, security and governance controls.**

If high-risk data becomes necessary, document:

- purpose
- lawful basis
- verification process
- access controls
- retention period
- deletion process
- processor/vendor arrangements

Publish an appropriate privacy notice and establish a data-subject request process.

## 28. Security

Target a production security posture aligned with OWASP ASVS Level 2 principles.

Controls:

- HTTPS
- secure authentication
- MFA for privileged admins
- secure password hashing
- secure sessions
- rate limiting
- CSRF protection where applicable
- server-side authorization
- input validation
- output encoding
- secure file uploads
- malware scanning
- encrypted backups
- secret management
- dependency scanning
- SAST
- logging
- monitoring

Hiding a button is not authorization. Every protected API operation must enforce permissions server-side.

## 29. File security

Private uploads include:

- passport photograph
- resolution letter
- supporting documents
- generated official documents

Use:

- MIME validation
- extension validation
- file size limits
- malware scanning
- randomized storage names
- private object storage
- signed/authorized download URLs
- download auditing

## 30. Authentication and authorization

Public registrants can use a lightweight status-retrieval mechanism such as reference + verified phone/email/OTP.

Administrative accounts require stronger authentication.

Recommended admin controls:

- password
- MFA
- session expiration
- rate limiting
- login monitoring
- role-based authorization

Suggested permissions:

- registrations.read
- registrations.create
- registrations.update
- registrations.review
- registrations.approve
- registrations.reject
- registrations.suspend
- documents.read
- documents.issue
- documents.revoke
- reports.read
- exports.create
- cms.read
- cms.write
- cms.publish
- users.manage
- roles.manage
- settings.manage
- audit.read

## 31. Audit trail

Audit:

- login
- registration submission
- record changes
- status changes
- approval
- rejection
- information requests
- document issuance
- document downloads
- exports
- user creation
- role changes
- configuration changes
- content publication

Record:

- actor
- action
- entity
- entity ID
- timestamp
- relevant metadata

## 32. Recommended technical stack

### Application

**Next.js**

Suitable for the public website and secure dashboard/application layer.

### Database

**PostgreSQL**

Suitable for structured registry data, relationships, filtering and reporting.

### Storage

Private S3-compatible object storage or an equivalent managed storage system.

### PDF/document generation

Reliable server-side PDF generation with versioned templates.

### Background processing

Use a queue/worker architecture for:

- PDF generation
- large exports
- email
- SMS
- WhatsApp notifications
- image processing
- malware scanning where asynchronous

Do not make users wait synchronously for expensive operations.

## 33. API architecture

Core domains:

### Authentication

- login
- logout
- password reset
- MFA

### Registration

- create
- update
- submit
- upload
- status

### Verification

- review queue
- request information
- approve
- reject
- suspend

### Documents

- list
- download
- verification

### Directory

- search
- public profile

### CMS

- announcements
- news
- events
- gallery

### Reports

- dashboard
- export

All critical validation and authorization occurs server-side.

## 34. Status transition rules

Allowed transitions:

**Draft → Submitted**

**Submitted → Under Review**

**Under Review → More Information Required**

**More Information Required → Under Review**

**Under Review → Approved**

**Under Review → Rejected**

**Approved → Suspended / Revoked**

**Suspended → Reinstated / Revoked**

Only authorized roles can perform each transition.

## 35. Document issuance rules

Documents may only be issued when:

- status is Approved / Verified
- required data is complete
- required approval exists
- authorized signatory configuration is valid
- active document templates exist

Document generation should be idempotent.

If PDF generation temporarily fails, the registration remains approved and the document job is retried.

## 36. Duplicate detection

Potential duplicate signals:

- normalized forum name
- phone numbers
- coordinator
- secretary
- LGA
- similar names

A suspected duplicate should be sent for human review rather than automatically rejected.

## 37. Data quality

Normalize:

- phone numbers
- emails
- LGA
- ward
- activity categories
- dates

Use controlled geographic selections.

Do not permit variants such as:

- Ilorin West
- ilorin west
- Ilorin-West

to become separate geographic records.

## 38. Performance

Original target:

**Under 3 seconds**

Treat this as a defined performance target rather than an absolute guarantee.

Optimize:

- image size
- JavaScript bundles
- database queries
- caching
- pagination
- CDN
- lazy loading
- server rendering
- background processing

The application must remain usable on slower Nigerian mobile connections.

## 39. UI/UX direction

The visual identity should communicate:

- credibility
- organization
- grassroots connection
- trust
- modern administration

It should feel like an official administrative platform, not a campaign flyer.

Use political/party visual cues consistently and with restraint.

Prioritize clarity over decoration.

## 40. Accessibility

Target WCAG 2.2 AA where practical.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus states
- adequate contrast
- accessible form labels
- meaningful errors
- screen-reader-compatible states
- alt text
- accessible dialogs
- adequate touch targets

## 41. SEO

Public pages should include:

- meaningful title
- meta description
- canonical URL
- Open Graph metadata
- X/Twitter metadata
- sitemap
- robots configuration
- structured data where useful

Do not index private registrations or admin pages.

## 42. Analytics

Potential metrics:

- homepage visits
- registration CTA clicks
- registration starts
- registration completions
- document retrieval
- directory searches
- announcement views

Analytics must not become an excuse for unnecessary personal-data collection.

## 43. Error handling

User-facing errors must be understandable and actionable.

Do not expose:

- stack traces
- database errors
- internal identifiers
- implementation details

Technical details belong in secure internal logs.

## 44. Observability

Monitor:

- uptime
- application errors
- API latency
- database health
- storage failures
- background-job failures
- document generation
- notification delivery
- authentication anomalies

Critical failures should alert administrators.

## 45. Environments

Maintain:

1. Local
2. Staging
3. Production

Never casually reuse production secrets in development.

Test document templates and issuance in staging before production.

## 46. Backups and recovery

Minimum:

- automated database backups
- encrypted backups
- separate backup storage
- documented recovery procedure
- periodic restoration testing

A backup that has never been restored is a theory, not a recovery plan.

## 47. Testing

### Unit tests

Test:

- validation
- status transitions
- authorization
- document field mapping
- geographic relationships
- duplicate detection

### Integration tests

Test:

- registration submission
- file upload
- approval
- document generation
- notification
- exports

### End-to-end

Test:

**Registration → Review → Approval → Document download**

### Security

Test:

- unauthorized access
- IDOR
- injection
- XSS
- CSRF where applicable
- file-upload abuse
- brute force
- privilege escalation

## 48. Definition of done

A feature is not complete merely because its UI exists.

It is complete when:

- UI works
- server logic works
- validation works
- authorization works
- database behavior works
- error states work
- mobile behavior works
- accessibility is considered
- security implications are reviewed
- tests exist where appropriate
- documentation is updated

## 49. MVP

### Public

- Home
- About
- Forum Registration
- Registration Status
- Verified Groups
- News/Updates
- Contact
- Privacy
- Terms/Disclaimer

### Core

- multi-step registration
- uploads
- reference number
- confirmation
- admin dashboard
- verification
- role-based access
- audit trail

### Documents

- certificate generation
- recognition letter generation
- secure download
- re-download
- versioning

### Reporting

- dashboard metrics
- filters
- XLSX
- CSV
- PDF

### CMS

- announcements
- news
- events
- gallery

## 50. Phase 2

Potential additions:

- forum self-service portal
- member imports
- activity reporting
- targeted announcements
- notification center
- training/event registration
- richer analytics
- public forum profiles

## 51. Phase 3 - nationwide

Add:

- all states
- state administrators
- LGA/ward structures
- national dashboard
- nationwide directory
- national reports
- state comparison

No core rewrite should be required.

## 52. Phase 4 - advanced operations

Potential future features:

- individual member registry
- digital membership IDs
- advanced QR verification
- field activity reporting
- volunteer coordination
- communication segmentation
- structured mobilization management

These should not inflate the MVP.

## 53. Critical decisions requiring organizational approval

Before production, confirm:

1. Exact official organization name.
2. Official logo.
3. Brand colors/fonts.
4. Authorized signatory.
5. Signatory title.
6. Authorization for digital signature.
7. Official stamp/seal.
8. Certificate wording.
9. Letter of Recognition wording.
10. Verification criteria.
11. Approval hierarchy.
12. Registration numbering convention.
13. Certificate expiry policy.
14. Revocation policy.
15. Public directory fields.
16. Data retention policy.
17. Privacy notice.
18. Terms/disclaimer.
19. Whether NIN is genuinely required.
20. Whether bank details are genuinely required.
21. Member Excel template.
22. Official communication providers.
23. WhatsApp communication policy.
24. Official social handles.
25. Verified Kwara LGA/ward dataset.

## 54. Repository structure

A reasonable implementation structure:

```text
apc-stakeholders-congress/
├── app/
│   ├── (public)/
│   ├── admin/
│   ├── registration/
│   ├── status/
│   ├── verify/
│   └── api/
├── components/
│   ├── ui/
│   ├── forms/
│   ├── admin/
│   ├── documents/
│   └── public/
├── lib/
│   ├── auth/
│   ├── database/
│   ├── validation/
│   ├── documents/
│   ├── notifications/
│   ├── exports/
│   └── audit/
├── data/
│   └── geography/
├── templates/
│   ├── certificate/
│   └── letter/
├── public/
│   └── brand/
├── tests/
├── scripts/
├── docs/
└── ...
```

Exact structure may change with implementation, but responsibilities should remain separated.

## 55. AI development-agent rules

Any AI coding agent working on this project must:

1. Read this blueprint before architectural changes.
2. Read the relevant supporting document before implementing a subsystem.
3. Never invent official organization information.
4. Never invent signatories.
5. Never invent legal claims.
6. Never invent certificate wording where official wording has not been approved.
7. Never expose sensitive registration information publicly.
8. Never bypass server-side authorization.
9. Never store secrets in source control.
10. Never hard-code Kwara geography into business logic.
11. Never issue documents before approval.
12. Never overwrite historical issued documents.
13. Never add NIN/bank fields without explicit product approval.
14. Never introduce unnecessary dependencies.
15. Prefer maintainable architecture over cleverness.
16. Test security-sensitive changes.
17. Preserve mobile-first UX.
18. Keep public and administrative concerns separated.
19. Update documentation when architecture materially changes.
20. When requirements conflict, stop and identify the conflict rather than silently guessing.

## 56. Launch gate

Do not launch until:

### Organization

- [ ] Logo approved
- [ ] Brand assets approved
- [ ] Signatory confirmed
- [ ] Digital signature authorized
- [ ] Stamp approved
- [ ] Certificate wording approved
- [ ] Letter wording approved

### Data

- [ ] Kwara LGAs verified
- [ ] Ward dataset verified
- [ ] Duplicate policy approved
- [ ] Data retention approved
- [ ] Privacy notice approved

### Technical

- [ ] Production database configured
- [ ] Private object storage configured
- [ ] Backups configured
- [ ] Restore tested
- [ ] HTTPS configured
- [ ] Admin MFA enabled
- [ ] Monitoring configured
- [ ] Error tracking configured
- [ ] Email configured
- [ ] Required notification provider configured

### Product

- [ ] Registration tested
- [ ] Verification tested
- [ ] Certificate tested
- [ ] Letter tested
- [ ] Re-download tested
- [ ] QR verification tested if enabled
- [ ] Directory tested
- [ ] CMS tested
- [ ] Export tested
- [ ] Mobile testing completed
- [ ] Security review completed

## 57. Master architecture principle

The platform should be built as a **trusted registry and administrative operating system for the APC Stakeholders Congress**, not as a static political website with a form attached.

The website is the front door.

The registry is the core asset.

The verification workflow creates trust.

The document engine turns verified records into official artifacts.

The CMS handles communication.

The reporting layer turns the registry into operational intelligence.

The architecture must allow Kwara State to be the first deployment of a nationwide system without requiring the team to rebuild the foundation when expansion arrives.

**Build the foundation as if nationwide expansion is inevitable, but build the MVP as if Kwara is the only state that exists.**
