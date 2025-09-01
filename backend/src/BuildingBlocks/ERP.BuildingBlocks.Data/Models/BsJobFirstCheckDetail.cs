using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobFirstCheckDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public DateOnly? FirstAppraisingDate { get; set; }

    public DateOnly? FirstAssessmentDate { get; set; }

    public DateOnly? CeinspectionDate { get; set; }

    public DateOnly? CargoExaminationDate { get; set; }

    public DateOnly? ForwdAppraisingDate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
