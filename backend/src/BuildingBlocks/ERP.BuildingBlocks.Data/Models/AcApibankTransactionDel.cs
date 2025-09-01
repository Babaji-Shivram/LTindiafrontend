using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcApibankTransactionDel
{
    public int Lid { get; set; }

    public int? PaymentRequestId { get; set; }

    public int? AttemptNo { get; set; }

    public string ReqTransferType { get; set; } = null!;

    public string? RequestReferenceNo { get; set; }

    public string? StatusCode { get; set; }

    public string? SubStatusCode { get; set; }

    public string? SubStatusText { get; set; }

    public string? UniqueResponseNo { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }
}
