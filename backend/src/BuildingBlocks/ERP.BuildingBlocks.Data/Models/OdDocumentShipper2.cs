using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdDocumentShipper2
{
    public int Lid { get; set; }

    public string? ShippingLineCode { get; set; }

    public string? ShippingLineName { get; set; }

    public string? DocumentName { get; set; }

    public string? StuffTp { get; set; }

    public string? CargoTp { get; set; }

    public string? AttachmentTitle { get; set; }
}
