using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CbFaBookM
{
    public int Lid { get; set; }

    public string? BookName { get; set; }

    public string? BookCode { get; set; }

    public int? CreatedUser { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? UpdatedUser { get; set; }

    public DateTime? UpdatesDate { get; set; }

    public bool? IsActive { get; set; }
}
