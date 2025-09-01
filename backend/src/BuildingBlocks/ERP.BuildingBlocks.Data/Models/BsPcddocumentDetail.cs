using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcddocumentDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int DocId { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public bool? PcdtoCustomer { get; set; }

    public bool? PcdtoScrutiny { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
