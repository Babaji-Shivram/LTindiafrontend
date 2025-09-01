using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CiInsuranceResponse
{
    public int Lid { get; set; }

    public int InsuranceReqId { get; set; }

    public string? Status { get; set; }

    public int? StatusCode { get; set; }

    public string? PolicyNo { get; set; }

    public string? Premium { get; set; }

    public string? CertificateNo { get; set; }

    public string? Gst { get; set; }

    public string? NetPremium { get; set; }

    public string? InvoiceUrl { get; set; }

    public string? CertificateUrl { get; set; }

    public string? Msg { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
