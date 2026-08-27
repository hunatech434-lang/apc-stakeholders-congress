# Reporting & Export Specification

## Dashboard reports

### Registration reports

- Total registrations
- Registrations by status
- Registrations over time
- Registrations by LGA
- Registrations by senatorial district
- Registrations by activity
- Registrations by coverage area

### Capacity reports

- Declared member strength
- Training interest
- Support needs
- WhatsApp availability

### Verification reports

- Pending queue
- Approval rate
- Rejection rate
- Average review time
- More-information requests

## Export formats

- XLSX for operational data
- CSV for data interchange
- PDF for presentation/official reports

## Export security

- Require permission
- Record actor
- Record filters used
- Record timestamp
- Optionally watermark PDF reports
- Do not include sensitive fields unless explicitly authorized
- Large exports should run as background jobs

## Data quality

Before export:

- Normalize phone numbers
- Normalize LGA/ward values
- Detect duplicates
- Preserve registration number
- Include status and timestamps
