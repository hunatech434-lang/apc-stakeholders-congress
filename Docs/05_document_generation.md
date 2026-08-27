# Document Generation Specification

## Principle

Document generation is a controlled issuance process, not merely a download button.

## Certificate template

Create one professionally designed master certificate.

Dynamic placeholders:

- {{FORUM_NAME}}
- {{REGISTRATION_NUMBER}}
- {{LGA}}
- {{STATE}}
- {{ISSUE_DATE}}
- {{SIGNATORY_NAME}}
- {{SIGNATORY_TITLE}}
- {{VERIFICATION_CODE}}
- {{QR_URL}}

Static assets:

- Official logo
- Border/background
- Seal/stamp
- Signature, where authorized

### Recommendation

Yes - design the certificate as a blank master template with reserved dynamic fields.

Do not manually create a certificate for every group.

The system should render the approved forum's name and other fields into the template automatically.

## Signature and stamp

Store authorized signature and stamp as controlled assets.

Requirements:

- Admin-only asset management
- Asset versioning
- Change audit trail
- No public raw asset URL
- Do not expose high-resolution signature files unnecessarily

## Letterhead

The supplied official letterhead becomes the base document template.

Avoid flattening dynamic content into a low-resolution image. Prefer a document/PDF generation workflow that preserves print quality.

## QR verification

Each issued certificate may contain a QR code pointing to a public verification page such as:

`/verify/{public-verification-token}`

The verification page should reveal only non-sensitive facts:

- Forum name
- Registration number
- State/LGA
- Issue date
- Status
- Document type
- Verification result

Never place private data in the QR payload.

## Re-download

Approved users can retrieve issued documents through a secure registration-status flow.

The system should return the existing issued document rather than regenerate it with a newer template.

If an issued document is revoked/reissued, preserve the history and mark the previous version accordingly.

## Numbering

Use a non-sequential, collision-resistant identifier for public references, for example:

`APCSC-KW-2026-XXXXXX`

The exact numbering convention should be approved by the organization before launch.
