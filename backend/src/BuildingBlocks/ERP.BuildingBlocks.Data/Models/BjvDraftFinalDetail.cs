using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvDraftFinalDetail
{
    public long Lid { get; set; }

    public long? JobId { get; set; }

    public string? Bjvno { get; set; }

    public string? Draftby { get; set; }

    public DateTime? Draftdate { get; set; }

    public string? Drfcompby { get; set; }

    public DateTime? Drfcompdate { get; set; }

    public string? Flby { get; set; }

    public DateTime? Fldate { get; set; }

    public DateTime? Invdate { get; set; }

    public string? Invno { get; set; }

    public int? Invamount { get; set; }

    /// <summary>
    /// 1 :- Bill Return By Customer
    /// </summary>
    public int? IsBillReturn { get; set; }

    public bool? IsBill { get; set; }

    /// <summary>
    /// 0- Pending,1 Dispatched, 2 - N.A.
    /// </summary>
    public int? DispatchStatus { get; set; }

    /// <summary>
    /// 0- Pending,1 EmailSent, 2 - N.A.
    /// </summary>
    public int? EbillStatus { get; set; }

    /// <summary>
    /// 0- Pending,1 Bll Uploaded, 2 - N.A.
    /// </summary>
    public int? PortalStatus { get; set; }

    public DateTime? EbillDate { get; set; }

    public DateTime? ClientPortalDate { get; set; }

    public string? ClientPortalRefNo { get; set; }

    /// <summary>
    /// 1- Bill Dispatched, 2 - Bill Return, 3 - Bill Paid
    /// </summary>
    public int? BillStatus { get; set; }

    public int? LStatus { get; set; }

    public string? Remark { get; set; }

    public int? ModuleId { get; set; }

    public string? Adjno { get; set; }

    public DateTime? Adjdate { get; set; }

    public decimal? Adjamount { get; set; }

    public bool? IsEbillFaupdate { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? Bdel { get; set; }
}
