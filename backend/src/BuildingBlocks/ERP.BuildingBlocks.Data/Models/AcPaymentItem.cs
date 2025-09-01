using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcPaymentItem
{
    public long Lid { get; set; }

    public int PaymentId { get; set; }

    public int? SrNo { get; set; }

    public string? ChargeName { get; set; }

    public string? ChargeCode { get; set; }

    public string? Hsn { get; set; }

    public decimal? Amount { get; set; }

    public decimal? TaxAmount { get; set; }

    public decimal? OtherDeduction { get; set; }

    public decimal? Igstrate { get; set; }

    public decimal? Cgstrate { get; set; }

    public decimal? Sgstrate { get; set; }

    public decimal? Igstamount { get; set; }

    public decimal? Cgstamount { get; set; }

    public decimal? Sgstamount { get; set; }

    public int TdsledgerCodeId { get; set; }

    public int? TdsrateType { get; set; }

    public decimal? Tdsrate { get; set; }

    public decimal? Tdsamount { get; set; }

    public decimal? Rcmrate { get; set; }

    /// <summary>
    /// 1-IGST, 2 CGST and SGST
    /// </summary>
    public int? RcmgstType { get; set; }

    public decimal? Rcmamount { get; set; }

    public decimal? Rcmigstamt { get; set; }

    public decimal? Rcmcgstamt { get; set; }

    public decimal? Rcmsgstamt { get; set; }

    public string? CgstparCodeId { get; set; }

    public string? SgstparCodeId { get; set; }

    public string? IgstparCodeId { get; set; }

    public string? RcmcgstparCodeId { get; set; }

    public string? RcmsgstparCodeId { get; set; }

    public string? RcmIgstparCodeId { get; set; }

    public string? Remark { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool Bdel { get; set; }
}
