using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobAdcPhoDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public DateOnly? AdcwithdrawnDate { get; set; }

    public DateOnly? AdcNocDate { get; set; }

    public DateOnly? AdcexamDate { get; set; }

    public DateOnly? PhosubmitDate { get; set; }

    public DateOnly? PhoscrutinyDate { get; set; }

    public DateOnly? PhopaymentDate { get; set; }

    public DateOnly? PhoappointDate { get; set; }

    public DateOnly? PhowithdrawnDate { get; set; }

    public DateOnly? PholabTestDate { get; set; }

    public DateOnly? PhoreportDate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
