using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerEbillConfirm
{
    public int Lid { get; set; }

    public string CustomerName { get; set; } = null!;

    public string? ContactPerson { get; set; }

    public string? ContactNumber { get; set; }

    public string? ContactEmail { get; set; }

    public bool EbillRequired { get; set; }

    public string? Remark { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }
}
