using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobDetail
{
    public int Lid { get; set; }

    public string? JobRefNo { get; set; }

    public int AlertId { get; set; }

    public int? JobType { get; set; }

    public int? Boetype { get; set; }

    public int? InBondJobId { get; set; }

    public string? InBondJobNo { get; set; }

    public decimal? GrossWt { get; set; }

    public int? NoOfPackages { get; set; }

    public int? PackageType { get; set; }

    public string? PackageCode { get; set; }

    public string? UnitCode { get; set; }

    public decimal? AssessableValue { get; set; }

    public int? Priority { get; set; }

    public int? IncoTermsId { get; set; }

    public DateOnly? Atadate { get; set; }

    /// <summary>
    /// Original Bill of Lading Date
    /// </summary>
    public DateOnly? OblrcvdDate { get; set; }

    public int? DeliveryType { get; set; }

    public bool? CheckListClientRequired { get; set; }

    public DateOnly? CheckListDate { get; set; }

    public string? CheckListDocPath { get; set; }

    public int? CheckListStatus { get; set; }

    public bool? Igmstatus { get; set; }

    public bool? DoplanningStatus { get; set; }

    public bool? Dostatus { get; set; }

    public int? DutyStatus { get; set; }

    public bool? NotingStatus { get; set; }

    public bool? FirstCheckRequired { get; set; }

    public int? FirstCheckStatus { get; set; }

    public bool? PassingStatus { get; set; }

    public bool? Adcphostatus { get; set; }

    public bool? ExamineStatus { get; set; }

    public bool? WarehousStatus { get; set; }

    public int? DeliveryStatus { get; set; }

    public bool ClearedStatus { get; set; }

    public bool? BackOfficeStatus { get; set; }

    public bool? Pcdstatus { get; set; }

    public bool Beprint { get; set; }

    public bool? Oocstatus { get; set; }

    public int StatusId { get; set; }

    public bool? ExbondStatus { get; set; }

    public string? FileDirName { get; set; }

    public string? ConsigneeGstin { get; set; }

    public string? ConsigneeAddr { get; set; }

    public string? ConsigneeCity { get; set; }

    public string? ConsigneeState { get; set; }

    public int? ConsigneeCode { get; set; }

    public string? ConsigneePinCode { get; set; }

    public string? ShipperName { get; set; }

    public string? ShipperAddr { get; set; }

    public string? Adcode { get; set; }

    public string? AdbankName { get; set; }

    public string? IecbranchCode { get; set; }

    /// <summary>
    /// Field used to Block Fund Request In Accound Module - Allow - 1, Blocked - 0
    /// </summary>
    public bool? IsFundAllowed { get; set; }

    public string? Remarks { get; set; }

    public string? FourSoftStatus { get; set; }

    public bool? IsBilled { get; set; }

    public bool? IsTransportBilled { get; set; }

    public string? Remark { get; set; }

    public int? FinYear { get; set; }

    public int? UserId { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public DateTime? BesyncDate { get; set; }

    public bool? IsBjvcreated { get; set; }

    public DateTime? FabillStatusCheckDate { get; set; }

    public bool? IsContractBilling { get; set; }

    public virtual ICollection<BsIgmdetail> BsIgmdetails { get; set; } = new List<BsIgmdetail>();
}
