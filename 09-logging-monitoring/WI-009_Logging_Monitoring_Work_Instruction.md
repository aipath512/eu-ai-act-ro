# WI-009

# Logging and Monitoring Work Instruction

---

## Document Information

| Field | Value |
|--------|-------|
| Document ID | WI-009 |
| Title | Logging and Monitoring Work Instruction |
| Repository | RRVI™ |
| Module | 09 – Logging and Monitoring |
| Company | {{COMPANY_NAME}} |
| Version | 1.0.0 |
| Status | Approved |

---

# 1. Purpose

This Work Instruction provides detailed guidance for implementing, operating and reviewing logging and monitoring controls for Artificial Intelligence systems used by {{COMPANY_NAME}}.

The objective is to ensure that AI system activities remain traceable, auditable and continuously monitored throughout their operational lifecycle.

---

# 2. Preconditions

Before implementing logging and monitoring verify that:

- the AI System exists in the AI System Inventory;
- the AI System Owner has been assigned;
- logging requirements have been defined;
- monitoring responsibilities have been assigned.

---

# 3. Required Information

Collect the following information:

- AI System ID
- AI System Name
- AI System Owner
- Logging Location
- Monitoring Tool
- Event Types
- Retention Period
- Review Frequency
- Responsible Reviewer

---

# 4. Work Instructions

## Step 1

Open:

REG-001_AI_System_Inventory_Register.md

Locate the AI system.

---

## Step 2

Configure Logging.

Ensure the following events are recorded where applicable:

- user authentication;
- AI requests;
- AI responses;
- configuration changes;
- administrator activities;
- security events;
- application errors;
- system failures.

---

## Step 3

Configure Monitoring.

Monitor:

- system availability;
- response time;
- resource utilization;
- AI service failures;
- unusual activity;
- security alerts.

---

## Step 4

Review Logs.

Verify:

- log completeness;
- timestamp accuracy;
- abnormal events;
- repeated failures;
- unauthorized activities.

Document significant observations.

---

## Step 5

Update Register.

Open:

REG-009_Logging_Monitoring_Register.md

Record:

- logging status;
- monitoring status;
- reviewer;
- review date;
- observations.

---

## Step 6

Collect Supporting Evidence.

Store evidence in:

EVID-009_Logging_Monitoring_Evidence.md

Examples include:

- log extracts;
- monitoring dashboards;
- system alerts;
- screenshots;
- incident reports;
- audit reports.

---

## Step 7

Periodic Review.

Review logging and monitoring whenever:

- AI systems change;
- infrastructure changes;
- security incidents occur;
- regulatory requirements change.

---

# 5. Quality Checks

Verify that:

✓ Logging is enabled.

✓ Monitoring is operational.

✓ Time synchronization is correct.

✓ Security events are logged.

✓ Errors are recorded.

✓ Logs are protected against modification.

✓ Retention period is defined.

✓ Register updated.

✓ Supporting evidence collected.

---

# 6. Outputs

This instruction updates:

- REG-009 Logging and Monitoring Register
- EVID-009 Logging and Monitoring Evidence
- DEC-009 Logging and Monitoring Declaration

---

# 7. References

- Regulation (EU) 2024/1689 (EU AI Act)
- DOD-009 Logging and Monitoring Policy
- PROC-009 Logging and Monitoring Procedure
- REG-001 AI System Inventory Register

---

# 8. Approval

Prepared by

{{RESPONSIBLE_PERSON}}

Company

{{COMPANY_NAME}}

Status

Approved
