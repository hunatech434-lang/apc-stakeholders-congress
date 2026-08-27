# APC Stakeholders Congress - Forum Registration Form

**Project:** APC Stakeholders Congress Portal  
**Initial deployment scope:** Kwara State  
**Purpose:** Capture, review, verify, register, and maintain records of APC-aligned forums, associations, and support groups.

## Form principles

- Registration is submitted by the forum's Coordinator/Chairman/President or Secretary.
- The initial deployment is restricted to Kwara State.
- LGA selection must use an authoritative predefined list of Kwara State LGAs.
- Ward should be captured as a structured field where the authoritative ward list is available.
- Political/geographical coverage should be separated from the forum's operating LGA/ward.
- Sensitive personal data must be minimized, access-controlled, encrypted where appropriate, and processed only for stated purposes.
- Registration does not by itself constitute official party membership or endorsement unless the Congress explicitly confirms this through its verification workflow.

## Section A - Forum details

1. **Name of Forum** - required, text
2. **Forum Coordinator / Chairman / President** - required, text
3. **Forum Secretary** - required, text
4. **Area of Coverage** - required, single select:
   - Kwara South
   - Kwara North
   - Kwara Central
   - Kwara State at Large
5. **LGA of Operation** - required, select from approved Kwara LGA list
6. **Ward of Operation** - required, select or text depending on approved ward dataset
7. **Office Address of Forum** - required, long text
8. **Year Forum Was Established** - required, year
9. **Total Strength of Forum** - required, integer

## Section B - Contact information

10. **Coordinator Phone Number** - required, Nigerian phone validation
11. **Secretary Phone Number** - required, Nigerian phone validation
12. **Forum Email Address** - optional, email validation
13. **Forum Social Media Handles** - optional, structured or long text
14. **Coordinator Passport Photograph** - required, JPG/PNG, maximum 2 MB

## Section C - Forum structure and capacity

15. **Key Activities** - required, multi-select:
   - Voter Mobilization
   - Youth Engagement
   - Women Mobilization
   - Sensitization / Awareness
   - Fundraising
   - Other
16. **Other Activity** - conditional text field
17. **WhatsApp Group** - required, Yes/No
18. **WhatsApp Group Link** - conditional, required if Yes
19. **Additional Structure / Capacity Information** - optional, long text

## Section D - Political track record

20. **Previous APC Election Activity** - required, single select:
   - 2023
   - 2019
   - Both 2019 and 2023
   - This is our first time
21. **Role Played in Last Election** - optional, long text
22. **APC Leader / Sponsor the Forum Aligns With** - optional, text

## Section E - Commitment and declaration

23. **Commitment to Work for APC Candidates in 2027** - required, Yes/No
24. **Agreement to Work With APC Stakeholders Congress and Align With the Party** - required, Yes/No
25. **Declaration** - required checkbox:
   - I confirm that the information provided is accurate and that our Forum is committed to the stated objectives and ideals of the APC Stakeholders Congress.
26. **Consent to Data Processing** - required checkbox:
   - I consent to the collection and processing of the information submitted for registration, verification, administration, communication, reporting, and related legitimate purposes of the APC Stakeholders Congress, subject to applicable data-protection requirements.

## Section F - Resources and support

27. **Support Needed** - multi-select:
   - Training
   - Logistics
   - Branded Materials
   - Data / Sensitization Materials
   - Financial Support
   - None for now
28. **Willingness to Attend Physical Meetings / Training in Ilorin** - required:
   - Yes
   - No
   - Maybe

## Section G - Documents

29. **Forum Resolution Letter** - optional file upload
30. **Other Supporting Document** - optional, configurable by admin

## Submission

After successful submission:

1. Generate a unique registration/reference number.
2. Show a confirmation screen.
3. Send confirmation through available channels.
4. Create a dashboard record with status **Pending Review**.
5. Prevent accidental duplicate registration using sensible duplicate checks.
6. Do not issue a "Verified" certificate until the configured verification/approval workflow has completed.

## Registration status

- Draft
- Submitted
- Under Review
- More Information Required
- Approved / Verified
- Rejected
- Suspended / Revoked

The registrant should be able to retrieve approved documents again using a secure registration reference and authentication mechanism.
