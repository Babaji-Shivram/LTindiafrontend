using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CbBillingDetail
{
    public long Lid { get; set; }

    public string ChargeCode { get; set; } = null!;

    public string? Heading { get; set; }

    public long CurrencyId { get; set; }

    public long Uomid { get; set; }

    public long? RangeCriteriaId { get; set; }

    public decimal? RangeFrom { get; set; }

    public decimal? RangeTo { get; set; }

    public long? CapCriteriaId { get; set; }

    public decimal? CapMin { get; set; }

    public decimal? CapMax { get; set; }

    public int UserSystemId { get; set; }

    public long ModeId { get; set; }

    public long PortId { get; set; }

    public long? TypeOfShipmentId { get; set; }

    public long? ContainerTypeId { get; set; }

    public long JobTypeId { get; set; }

    public long TypeOfBeid { get; set; }

    public int RmsnonRmsid { get; set; }

    public int LoadedDeStuffId { get; set; }

    public decimal? Rate { get; set; }

    public DateTime CreatedDate { get; set; }

    public bool BDel { get; set; }

    public int? Cmid { get; set; }

    public int? DivisionId { get; set; }

    public string? IsMultiple { get; set; }

    public string? IsMultipleOnKg { get; set; }

    public string? IsBillDone { get; set; }

    public decimal? Quantity { get; set; }

    public DateTime? Updatedate { get; set; }

    public string? Condition { get; set; }

    public string? FabookId { get; set; }
}
