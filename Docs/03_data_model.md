# Data Model

## Core entities

### forums

- id
- registration_number
- name
- coordinator_name
- secretary_name
- coverage_area
- state
- lga_id
- ward_id
- office_address
- established_year
- member_count
- email
- status
- submitted_at
- reviewed_at
- approved_at
- created_at
- updated_at

### forum_contacts

- id
- forum_id
- contact_type
- phone
- normalized_phone
- email
- social_handle
- is_primary

### forum_activities

- id
- forum_id
- activity_type
- custom_activity

### forum_commitments

- forum_id
- election_commitment
- congress_alignment
- declaration_accepted_at
- privacy_consent_at
- consent_version

### forum_documents

- id
- forum_id
- document_type
- storage_key
- original_filename
- mime_type
- file_size
- checksum
- uploaded_at
- uploaded_by
- verification_status

### generated_documents

- id
- forum_id
- document_type
- document_number
- template_version
- generated_at
- storage_key
- checksum
- issued_by
- revoked_at
- revocation_reason

### users

- id
- name
- email
- phone
- password_hash / identity-provider reference
- role_id
- status
- last_login_at

### roles

- id
- name

### permissions

- id
- key
- description

### role_permissions

- role_id
- permission_id

### announcements

- id
- title
- body
- audience_definition
- status
- published_at
- created_by

### events

- id
- title
- description
- start_at
- end_at
- location
- cover_image
- status

### gallery_items

- id
- title
- image/video reference
- caption
- published_at

### notifications

- id
- recipient/user/forum
- channel
- event_type
- status
- provider_reference
- sent_at
- failure_reason

### audit_logs

- id
- actor_user_id
- action
- entity_type
- entity_id
- metadata
- ip_hash / approved audit metadata
- user_agent
- created_at

## Geographic reference data

Do not let admins freely type core geographic values.

Create controlled reference tables:

- states
- senatorial_districts
- lgas
- wards

Initial seed: Kwara State and its authoritative LGAs/wards.

Design schema so other Nigerian states can be enabled later without a migration that changes the core model.

## Sensitive data

NIN and financial/bank data are high-risk fields.

Do not collect NIN simply because it appears in an early PRD unless the organization has a documented legal/operational need, lawful basis, security controls, retention policy, and verification process.

If bank details are not required at launch, omit them from MVP.
