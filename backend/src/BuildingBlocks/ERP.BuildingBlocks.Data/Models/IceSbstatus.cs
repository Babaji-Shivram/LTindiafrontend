using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceSbstatus
{
    public int Lid { get; set; }

    public int Sbid { get; set; }

    public string? WarehouseCode { get; set; }

    public string? WarehouseName { get; set; }

    public string? CurrentQue { get; set; }

    public string? CurrentStatus { get; set; }

    public string? AppraisingDate { get; set; }

    public string? AcApr { get; set; }

    public string? AcAprDate { get; set; }

    public string? ExamMarkId { get; set; }

    public string? MarkDate { get; set; }

    public string? InspEo { get; set; }

    public string? ExamDate { get; set; }

    public string? SupdtAoId { get; set; }

    public string? DbkAcId { get; set; }

    public string? DbkAcIdDate { get; set; }

    public string? DbkSupdtId { get; set; }

    public string? DbkSupdtDate { get; set; }

    public string? DepbSupdt { get; set; }

    public string? DepbSupdtDate { get; set; }

    public string? DepbLic { get; set; }

    public string? DepbLicDate { get; set; }

    public string? SampleDrawn { get; set; }

    public string? TestReport { get; set; }

    public string? LeoDate { get; set; }

    public string? EpCopyPrintStatus { get; set; }

    public string? PrintStatus { get; set; }

    public string? DbkScrollNo { get; set; }

    public string? ScrollDate { get; set; }

    public string? EgmStatus { get; set; }

    public string? EgmNo { get; set; }

    public DateTime? EgmDate { get; set; }

    public string? EgmerrorMessage { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }
}
