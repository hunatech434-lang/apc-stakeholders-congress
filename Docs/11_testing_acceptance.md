# Testing & Acceptance Criteria

## Registration

- Required fields cannot be skipped.
- Invalid phone/email values are rejected.
- LGA is limited to Kwara State in the initial release.
- Ward is validated against configured data where available.
- File type and size restrictions work.
- Duplicate detection works.
- Submission creates a unique reference.
- User receives confirmation.
- Admin sees the new record.

## Verification

- Only authorized users can review.
- More-information requests change status correctly.
- Approval requires required fields/documents.
- Rejection is auditable.
- Approved records appear in the verified directory.
- Rejected/private records do not appear publicly.

## Document generation

- Certificate uses approved template.
- Letter uses official letterhead.
- Forum name and registration number render correctly.
- Signature/stamp assets render correctly.
- PDF is print-ready.
- Existing issued documents remain unchanged when a template is updated.
- QR verification resolves to the correct public record.
- Revoked documents show revoked status.

## Admin

- Role permissions are enforced server-side.
- Search/filter works.
- Export respects permissions and filters.
- Content publishing works.
- Audit records are generated.

## Security

- Common injection attacks are mitigated.
- Unauthorized direct API access is denied.
- Uploaded files cannot execute.
- Rate limits work.
- Admin MFA works.
- Secrets are not present in frontend bundles or repositories.

## Performance

Target:

- Fast first render on mobile
- Optimized images
- Lazy loading
- Efficient database queries
- Paginated admin tables
- Background processing for heavy jobs

The original <3 second requirement should be treated as a performance target, not a guarantee under every network/device condition.

## Launch gate

Do not launch until:

- Backup/restore tested
- Production domain and HTTPS verified
- Admin accounts secured
- Privacy notice published
- Terms/disclaimer reviewed
- Document templates approved
- Authorized signatory assets approved
- Geographic dataset verified
- Export permissions tested
- Incident response owner identified
