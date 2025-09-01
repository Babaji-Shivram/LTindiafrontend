using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcApibankLogin
{
    public int Lid { get; set; }

    public string BankName { get; set; } = null!;

    public string Apiname { get; set; } = null!;

    public string? Apikey { get; set; }

    public string? Apisecret { get; set; }

    public bool IsActive { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
