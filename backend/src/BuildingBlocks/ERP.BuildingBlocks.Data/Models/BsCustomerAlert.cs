using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerAlert
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public int? ConsigneeId { get; set; }

    public int? ConsigneeIdOld { get; set; }

    public string? ConsigneeCode { get; set; }

    public int? TransMode { get; set; }

    public int? Port { get; set; }

    public string? PortCode { get; set; }

    public DateOnly? Etadate { get; set; }

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public int? BabajiBranchId { get; set; }

    public int? PortOfLoadingId { get; set; }

    public int? BoetypeId { get; set; }

    public int? Kamid { get; set; }

    public string? Adcode { get; set; }

    public string? IecbranchCode { get; set; }

    public string? BankName { get; set; }

    public string? CustRefNo { get; set; }

    public string? CustInstruction { get; set; }

    public string? Remark { get; set; }

    public int? JobId { get; set; }

    public string? JobRefNo { get; set; }

    public string? UserEmail { get; set; }

    public string? DirPath { get; set; }

    public string? LoginIp { get; set; }

    public int? LUser { get; set; }

    public int? LUserType { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
