using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdscrutinyStatusDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int ScrutinyStatus { get; set; }

    public int? AuthorisedBy { get; set; }

    public DateTime? AuthorisedDate { get; set; }

    public string? AuthorRemark { get; set; }

    public int RequestedBy { get; set; }

    public DateTime RequestedDate { get; set; }

    public string? RequestRemark { get; set; }

    public bool IsActive { get; set; }

    public bool? BDel { get; set; }

    public int? ModuleId { get; set; }
}
