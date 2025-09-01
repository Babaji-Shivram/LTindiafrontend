using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigSkfTest
{
    public int Lid { get; set; }

    public int? Jobid { get; set; }

    public string? Jobrefno { get; set; }

    public int? Olddivisionid { get; set; }

    public int? Newdivisionid { get; set; }

    public int? Oldplantid { get; set; }

    public int? Newplantid { get; set; }

    public string? Oldshimentno { get; set; }

    public string? Newshipmentno { get; set; }

    public int? Errflag { get; set; }

    public string? Division { get; set; }

    public string? Plant { get; set; }

    public string? NewDivision { get; set; }

    public string? NewPlant { get; set; }
}
