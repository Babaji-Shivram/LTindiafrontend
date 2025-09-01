using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobAssignForStatus
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int UserId { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
