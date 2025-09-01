using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTransporterBankDetail
{
    public int Lid { get; set; }

    public int TransporterId { get; set; }

    public string? BankName { get; set; }

    public string? AccountName { get; set; }

    public string? AccountNo { get; set; }

    public string? Ifsccode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
