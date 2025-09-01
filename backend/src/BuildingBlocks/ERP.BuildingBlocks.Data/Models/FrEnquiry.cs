using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiry
{
    public int Lid { get; set; }

    public string EnqrefNo { get; set; } = null!;

    public string? OldRefNo { get; set; }

    public DateOnly Enqdate { get; set; }

    public string? FrjobNo { get; set; }

    public string? Customer { get; set; }

    public int? CustId { get; set; }

    public string? CustRefNo { get; set; }

    public int LType { get; set; }

    public int LMode { get; set; }

    public int LStatus { get; set; }

    public int? LostStatusId { get; set; }

    public bool? IsBilled { get; set; }

    public bool? IsTransportBilled { get; set; }

    public int? SalesRepId { get; set; }

    public int? FinYear { get; set; }

    public string? DocDir { get; set; }

    public int? ChajobId { get; set; }

    public bool? IsFundAllowed { get; set; }

    public DateTime DtDate { get; set; }

    public int LUser { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }

    public bool? IsAlibabaEnq { get; set; }

    public int? DeliveryType { get; set; }

    public int? DeliveryStatus { get; set; }

    public int? EnquiryValue { get; set; }

    public DateTime? FabillStatusCheckDate { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();

    public virtual FrEnquiryDetail? FrEnquiryDetail { get; set; }
}
