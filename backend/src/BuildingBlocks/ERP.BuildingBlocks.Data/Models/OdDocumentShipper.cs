using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdDocumentShipper
{
    public int Lid { get; set; }

    public int? DocumentId { get; set; }

    public string? BnfNm { get; set; }

    public string? LinerCode { get; set; }

    public string? StuffTp { get; set; }

    public string? CargoTp { get; set; }

    public string? IsSeawayBl { get; set; }

    public string? AttachmentTitle { get; set; }

    public string? IsMandatory { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }
}
