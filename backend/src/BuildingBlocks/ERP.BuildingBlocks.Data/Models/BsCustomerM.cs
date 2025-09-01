using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerM
{
    public int Lid { get; set; }

    public string CustName { get; set; } = null!;

    public string? CustCode { get; set; }

    public string? ContactPerson { get; set; }

    public string? Email { get; set; }

    public string? MobileNo { get; set; }

    public string? ContactNo { get; set; }

    public string? Address { get; set; }

    public bool Pcdrequired { get; set; }

    public bool TransportationRequired { get; set; }

    public bool Svbapplicable { get; set; }

    public string? Iecno { get; set; }

    /// <summary>
    /// Allow Different GST No in Vendor Invoice Submission other then Bill Of Entry
    /// </summary>
    public bool? IsDifferentGstnoAllowed { get; set; }

    public bool? IsPaymentReceiptRequired { get; set; }

    public string? ReferredBy { get; set; }

    public string? IncomeTaxNo { get; set; }

    public string? DocFolder { get; set; }

    public bool? IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public string? ConsigneeName { get; set; }

    public string? BinNo { get; set; }

    public string? Remark { get; set; }

    public int? VendorId { get; set; }

    public string? UniqCode { get; set; }

    public string? BillInstruction { get; set; }

    public bool MovementRequired { get; set; }

    /// <summary>
    /// 1- Allow System Generated Docs Expense
    /// </summary>
    public bool SystemGenExpense { get; set; }

    public bool? CustChecklistApproval { get; set; }

    public bool? IsTransAgencyPost { get; set; }

    /// <summary>
    /// Transport Bill To babaji True else False
    /// </summary>
    public bool? IsTransBillToBabaji { get; set; }

    public int? StatusId { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();
}
