using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MsBillingInstruction
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public int? ModuleId { get; set; }

    public string? AlliedAgencyService { get; set; }

    public string? AlliedAgencyRemark { get; set; }

    public string? OtherService { get; set; }

    public string? OtherServiceRemark { get; set; }

    public string? Instruction { get; set; }

    public string? Instruction1 { get; set; }

    public string? Instruction2 { get; set; }

    public string? Instruction3 { get; set; }

    public string? InstructionCopy { get; set; }

    public string? InstructionCopy1 { get; set; }

    public string? InstructionCopy2 { get; set; }

    public string? InstructionCopy3 { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }

    public int Luser { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
