using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDraftQuotation
{
    public int Lid { get; set; }

    public string? QuoteRefNo { get; set; }

    public DateOnly? QuoteDate { get; set; }

    public bool IsTenderQuote { get; set; }

    public int? BranchId { get; set; }

    public int? ServiceId { get; set; }

    public int? CustomerId { get; set; }

    public string CustomerName { get; set; } = null!;

    public string? OrganisationAddress { get; set; }

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public string? AddressLine3 { get; set; }

    public string? AttendedPerson { get; set; }

    public string? MailId { get; set; }

    public string? ContacNo { get; set; }

    public string? Subject { get; set; }

    public bool? IncludeBody { get; set; }

    public string? BodyContent { get; set; }

    public string? PaymentTerms { get; set; }

    public bool IsLumpSumCode { get; set; }

    public bool IsValidDraft { get; set; }

    public string? OtherNotes { get; set; }

    public int? StatusId { get; set; }

    public string? Remark { get; set; }

    public string? QuotePath { get; set; }

    public int? TermConditionId { get; set; }

    public int? FinYearId { get; set; }

    public DateOnly? ContractStartDt { get; set; }

    public DateOnly? ContractEndDt { get; set; }

    public string? ContractCopy { get; set; }

    public bool IsTemplate { get; set; }

    public string? TemplateFor { get; set; }

    public int? KamId { get; set; }

    public int? SalesPersonId { get; set; }

    public string? SalesPersonName { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public int? EnquiryId { get; set; }
}
