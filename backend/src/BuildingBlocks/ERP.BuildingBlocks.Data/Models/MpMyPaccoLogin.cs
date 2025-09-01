using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MpMyPaccoLogin
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string ApiuserName { get; set; } = null!;

    public string Apipasscode { get; set; } = null!;

    public bool BDel { get; set; }
}
