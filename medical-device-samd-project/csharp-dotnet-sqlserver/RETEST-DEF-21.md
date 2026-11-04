# Retest DEF-21
Build: 1.4.3
1. Export MR-10022 as qa.user.
2. Verify report generated.
3. Query AuditEvent for MR-10022.
4. Verify action/user/version/timestamp/result.
5. Run regression for repeated export and unauthorized user.
Result: PASS when evidence matches SWR-006.
