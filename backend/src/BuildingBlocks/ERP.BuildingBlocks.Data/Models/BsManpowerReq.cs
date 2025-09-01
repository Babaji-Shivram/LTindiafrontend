using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsManpowerReq
{
    public int Lid { get; set; }

    public string? DeptName { get; set; }

    public string? DeptMngrNm { get; set; }

    public string? AddtionalReq { get; set; }

    public string? ReplacementReq { get; set; }

    public string? TotalEmpReq { get; set; }

    public DateOnly? ManpowerReqDt { get; set; }

    public string? PosRequiredFor { get; set; }

    public string? PosReportingTo { get; set; }

    public string? Location { get; set; }

    public string? SalaryRange { get; set; }

    public string? MinQualifReq { get; set; }

    public string? PrevExperiance { get; set; }

    public string? JobResponsibility { get; set; }

    public string? AdditionalInfo { get; set; }

    public int? ApproveStatus { get; set; }

    public string? RejectReason { get; set; }

    public DateTime? ApproveDt { get; set; }

    public int? ApprRejectBy { get; set; }

    public string? Source { get; set; }

    public string? Remark { get; set; }

    public int? CompleteStatus { get; set; }

    public int? CompleteBy { get; set; }

    public DateTime? CompleteDt { get; set; }

    public int? FinYearId { get; set; }

    public int? LUser { get; set; }

    public DateOnly? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateOnly? UpdDate { get; set; }

    public string? BDel { get; set; }
}
