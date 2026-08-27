# Deployment & Operations

## Environments

- Local development
- Staging
- Production

Never test document issuance, mass notifications, or destructive operations directly in production.

## Infrastructure

Use managed services where practical.

Components:

- Web/application hosting
- PostgreSQL
- Object storage
- Email provider
- Optional SMS provider
- Background worker
- Monitoring/logging
- Backup system

A Nigerian-hosted server is not automatically faster or more compliant. Choose infrastructure based on latency, reliability, data-residency requirements, support, and cost.

## Backups

Minimum policy:

- Automated database backups
- Point-in-time recovery where available
- Separate backup storage
- Encrypted backups
- Periodic restore tests

## Monitoring

Track:

- Uptime
- Error rate
- API latency
- Database health
- Queue failures
- Storage failures
- Authentication anomalies
- Notification failures

## Scaling

The schema and architecture should support nationwide expansion without rebuilding the system.

Future dimensions:

- State
- LGA
- Ward
- Senatorial district
- geopolitical zone
- national administration

## Disaster recovery

Document:

- Who owns recovery
- How to restore database
- How to restore files
- How to rotate compromised credentials
- How to recover document-generation service
- How to communicate an outage
