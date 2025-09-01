using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsVendorLogin
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public string Passcode { get; set; } = null!;

    public int VendorTypeId { get; set; }

    public int? CompanyId { get; set; }

    public DateTime? LoginDate { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
