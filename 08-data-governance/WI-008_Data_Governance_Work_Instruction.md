# WI-008

# Data Governance Work Instruction

---

## Document Information

| Field | Value |
|--------|-------|
| Document ID | WI-008 |
| Title | Data Governance Work Instruction |
| Repository | RRVI™ |
| Module | 08 – Data Governance |
| Company | {{COMPANY_NAME}} |
| Version | 1.0.0 |
| Status | Approved |

---

# 1. Purpose

This Work Instruction provides detailed guidance for identifying, documenting, reviewing and maintaining data used by Artificial Intelligence systems within {{COMPANY_NAME}}.

The objective is to ensure that AI systems use reliable, secure and well-governed data throughout their operational lifecycle.

---

# 2. Preconditions

Before performing Data Governance activities verify that:

- the AI System exists in the AI System Inventory;
- the AI System Owner has been assigned;
- data sources are known;
- intended purpose has been documented.

---

# 3. Required Information

Collect the following information:

- AI System ID
- AI System Name
- Data Owner
- Data Source
- Data Category
- Data Classification
- Personal Data (Yes/No)
- Data Quality Level
- Data Retention Period
- Review Date

---

# 4. Work Instructions

## Step 1

Open:

REG-001_AI_System_Inventory_Register.md

Locate the AI system.

---

## Step 2

Identify all data sources.

Document:

- internal databases;
- cloud services;
- uploaded files;
- APIs;
- public datasets;
- manually entered information.

---

## Step 3

Classify the data.

Identify whether the data is:

- Public;
- Internal;
- Confidential;
- Restricted;
- Personal Data;
- Sensitive Personal Data (if applicable).

---

## Step 4

Evaluate Data Quality.

Verify:

- accuracy;
- completeness;
- consistency;
- integrity;
- relevance;
- timeliness.

Document any limitations.

---

## Step 5

Verify Security Controls.

Confirm:

- access control;
- authentication;
- authorization;
- encryption where applicable;
- backup procedures;
- retention policy.

---

## Step 6

Update Register.

Open:

REG-008_Data_Governance_Register.md

Record:

- data source;
- owner;
- classification;
- review date;
- status.

---

## Step 7

Collect Supporting Evidence.

Store evidence in:

EVID-008_Data_Governance_Evidence.md

Examples include:

- data flow diagrams;
- database schemas;
- API specifications;
- access control documentation;
- GDPR documentation;
- security policies.

---

## Step 8

Review.

Repeat Data Governance review whenever:

- data sources change;
- AI systems change;
- legislation changes;
- security incidents occur.

---

# 5. Quality Checks

Verify that:

✓ Data sources identified.

✓ Data Owner assigned.

✓ Data classified.

✓ Data quality evaluated.

✓ Security controls documented.

✓ GDPR compliance considered.

✓ Register updated.

✓ Supporting evidence collected.

✓ Review date assigned.

---

# 6. Outputs

This instruction updates:

- REG-008 Data Governance Register
- EVID-008 Data Governance Evidence
- DEC-008 Data Governance Declaration

---

# 7. References

- Regulation (EU) 2024/1689 (EU AI Act)
- Regulation (EU) 2016/679 (GDPR)
- DOD-008 Data Governance Policy
- PROC-008 Data Governance Procedure
- REG-001 AI System Inventory Register

---

# 8. Approval

Prepared by

{{RESPONSIBLE_PERSON}}

Company

{{COMPANY_NAME}}

Status

Approved
