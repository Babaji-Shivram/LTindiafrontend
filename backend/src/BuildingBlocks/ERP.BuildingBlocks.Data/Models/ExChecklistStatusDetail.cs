using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExChecklistStatusDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ChecklistStatus { get; set; }

    public int? AuthorisedBy { get; set; }

    public DateTime? AuthorisedDate { get; set; }

    public string? AuthorRemark { get; set; }

    public int RequestedBy { get; set; }

    public string? RequestRemark { get; set; }

    public DateTime RequestedDate { get; set; }

    public bool IsActive { get; set; }

    public bool IsFinal { get; set; }

    public bool BDel { get; set; }
}
