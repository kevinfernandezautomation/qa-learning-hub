# DEF-21 — Export succeeds without audit event
Build: 1.4.2
Requirement: SWR-006
Observed: report generated; query returns 0 matching AuditEvent rows.
Expected: one traceable REPORT_EXPORT event.
Correction: persist audit event and surface failure if audit persistence fails.
