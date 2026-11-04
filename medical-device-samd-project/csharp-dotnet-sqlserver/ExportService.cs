namespace MedReview.Training;

public sealed record AuditEvent(string Action,string RecordId,string UserId,string SoftwareVersion,DateTime OccurredAtUtc,string Result);
public interface IAuditRepository { Task WriteAsync(AuditEvent evt); }
public interface IReportExporter { Task<string> ExportAsync(string recordId); }

public sealed class ExportService
{
    private readonly IReportExporter _report; private readonly IAuditRepository _audit;
    private readonly string _version;
    public ExportService(IReportExporter report, IAuditRepository audit, string version) => (_report,_audit,_version)=(report,audit,version);
    public async Task<string> ExportAsync(string recordId,string userId)
    {
        if (string.IsNullOrWhiteSpace(recordId)) throw new ArgumentException("recordId required");
        var path=await _report.ExportAsync(recordId);
        await _audit.WriteAsync(new("REPORT_EXPORT",recordId,userId,_version,DateTime.UtcNow,"SUCCESS"));
        return path;
    }
}
