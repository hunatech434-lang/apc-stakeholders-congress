# Geography & Seed Data

## Initial jurisdiction

The first production registration jurisdiction is:

**State:** Kwara State

The application should expose only approved Kwara LGAs during initial registration.

## Senatorial districts

The initial system should support Kwara's three senatorial districts as controlled values:

- Kwara Central
- Kwara North
- Kwara South

## Geopolitical zone

Kwara State belongs to the **North Central** geopolitical zone.

Store geopolitical zone as reference data rather than as free text.

## LGA data

The application should seed the authoritative list of Kwara State's 16 LGAs and their wards from a verified source before production.

Do not hard-code geographic names throughout the frontend.

## Expansion

Nationwide expansion should be enabled by data/configuration:

- Add state
- Add senatorial districts
- Add LGAs
- Add wards
- Activate registration jurisdiction

Avoid rewriting business logic for each state.
