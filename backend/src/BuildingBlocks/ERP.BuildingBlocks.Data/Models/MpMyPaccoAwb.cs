using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MpMyPaccoAwb
{
    public int Lid { get; set; }

    public string? OrderNo { get; set; }

    public string? Awbno { get; set; }

    public string? Lspname { get; set; }

    public DateTime? Awbdate { get; set; }

    public int? CustomerId { get; set; }

    public int BranchId { get; set; }

    public int PlantId { get; set; }

    public int? PlantAddressId { get; set; }

    public int LStatus { get; set; }

    public DateTime? StatusDate { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
