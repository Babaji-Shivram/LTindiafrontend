using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerField
{
    public int Lid { get; set; }

    public int CustId { get; set; }

    public int FieldId { get; set; }

    public int? LOrder { get; set; }

    public bool? IsReport { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
