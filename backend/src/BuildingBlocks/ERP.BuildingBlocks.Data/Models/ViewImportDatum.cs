using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ViewImportDatum
{
    public string? BsJobNo { get; set; }

    public string Mode { get; set; } = null!;

    public string Branch { get; set; } = null!;

    public string? DocumentsReceivedDate { get; set; }

    public string? JobCreationDate { get; set; }

    public string Eta { get; set; } = null!;

    public string Ata { get; set; } = null!;

    public string InwardDate { get; set; } = null!;

    public string AssessmentDate { get; set; } = null!;

    public string? OutOfChargeDate { get; set; }

    public string? PortOfLoading { get; set; }

    public string Customer { get; set; } = null!;

    public string Consignee { get; set; } = null!;

    public string PortOfDischarge { get; set; } = null!;

    public decimal? AssessableValue { get; set; }

    public int? DutyAmount { get; set; }

    public string? JobType { get; set; }

    public string? BoeType { get; set; }

    public int? NoOfPkgs { get; set; }

    public decimal? GrossWeight { get; set; }

    public string ContainerType { get; set; } = null!;

    public int CountOfContainerNo { get; set; }

    public int SumOf20 { get; set; }

    public int SumOf40 { get; set; }
}
