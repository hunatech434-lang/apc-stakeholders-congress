# Security, Privacy & Data Protection

## Security baseline

Target a production security posture aligned with OWASP ASVS Level 2 principles.

Controls:

- HTTPS everywhere
- Secure authentication
- MFA for privileged admins
- Strong password hashing
- Rate limiting
- CSRF protection where applicable
- Secure cookies
- Input validation
- Output encoding
- File upload validation
- Malware scanning for uploaded files
- Database encryption at rest where supported
- Encrypted backups
- Secrets stored outside source code
- Dependency scanning
- SAST
- Logging and alerting
- Regular backup restoration tests

## Role-based access

Every sensitive endpoint must enforce server-side authorization.

Hiding a button in the UI is not security.

## File security

Uploaded documents and photographs:

- Must not be executable
- Validate MIME type and extension
- Generate server-side storage names
- Store outside public web root where possible
- Scan uploads
- Apply size limits
- Use signed/authorized download URLs
- Log sensitive downloads

## Privacy

The platform handles personal information.

Before production launch, obtain Nigerian privacy/legal review and establish:

- Purpose of processing
- Lawful basis
- Privacy notice
- Data retention schedule
- Data subject rights process
- Access/correction process
- Breach response process
- Processor/vendor agreements
- Cross-border data transfer assessment where applicable
- Staff access policy

Nigeria's current data-protection framework should be treated as a real compliance requirement, not a checkbox.

## Data minimization

The original concept includes NIN and bank details. Do not collect either by default.

Only collect high-risk data when there is a documented reason, approved process, and adequate safeguards.

## Public directory privacy

Never publish:

- NIN
- Personal identification documents
- Private phone numbers
- Bank information
- Internal verification notes
- Uploaded private documents
- Passwords or authentication data

## Retention

Define separate retention periods for:

- Registration records
- Rejected registrations
- Identity documents
- Uploaded supporting documents
- Audit logs
- Notification logs
- Generated certificates

Deletion should be policy-driven, not manual database cleanup.

## Incident response

Create a documented process for:

1. Detect
2. Contain
3. Investigate
4. Notify required parties
5. Recover
6. Review and improve
