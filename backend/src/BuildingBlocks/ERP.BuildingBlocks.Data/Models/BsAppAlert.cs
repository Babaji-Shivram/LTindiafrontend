using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAppAlert
{
    public int UserId { get; set; }

    public int Jobid { get; set; }

    public int SetAlert { get; set; }

    public bool? SStatus { get; set; }

    public bool? SSent { get; set; }
}
