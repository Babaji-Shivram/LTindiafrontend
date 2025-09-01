using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class WhatsAppCallbackContact
{
    public int EntryId { get; set; }

    public string? CallbackId { get; set; }

    public string? WaId { get; set; }

    public string? ProfileName { get; set; }

    public string? RawCallback { get; set; }

    public DateTime? ReceivedAt { get; set; }

    public bool? BDel { get; set; }
}
