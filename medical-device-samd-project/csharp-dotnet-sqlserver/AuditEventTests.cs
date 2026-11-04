// xUnit-style illustrative test
[Fact]
public async Task Export_PersistsTraceableAuditEvent()
{
  var audit=new FakeAuditRepository();
  var sut=new ExportService(new FakeReportExporter(),audit,"1.4.3");
  await sut.ExportAsync("MR-10022","qa.user");
  Assert.Single(audit.Events);
  Assert.Equal("REPORT_EXPORT",audit.Events[0].Action);
  Assert.Equal("MR-10022",audit.Events[0].RecordId);
  Assert.Equal("1.4.3",audit.Events[0].SoftwareVersion);
}
