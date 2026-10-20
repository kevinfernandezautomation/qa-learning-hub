required={"requirement","implementation","sql","test","defect","correction","retest"}
artifact={"requirement":"SWR-006","implementation":"ExportService.cs","sql":"AuditEvent.sql","test":"TC-AUD-003","defect":"DEF-21","correction":"1.4.3","retest":"PASS"}
missing=[k for k in required if not artifact.get(k)]
print("TRACEABILITY PASS" if not missing else f"MISSING: {missing}")
