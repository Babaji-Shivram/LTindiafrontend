using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvMasterInvoice
{
    public int Lid { get; set; }

    public string? Sno { get; set; }

    public int? JobId { get; set; }

    public string? Bjvno { get; set; }

    public string? Recordtype { get; set; }

    public DateOnly? Opdate { get; set; }

    public string? Mainrefno { get; set; }

    public string? Partyref { get; set; }

    public string? Blno { get; set; }

    public DateOnly? Bldate { get; set; }

    public string? Hawbno { get; set; }

    public DateOnly? Hawbdate { get; set; }

    public string? Beno { get; set; }

    public DateOnly? Bedate { get; set; }

    public string? Igmno { get; set; }

    public DateOnly? Igmdate { get; set; }

    public string? Invno { get; set; }

    public DateOnly? Invdate { get; set; }

    public string? Seaair { get; set; }

    public DateOnly? Cleardate { get; set; }

    public string? Vessal { get; set; }

    public DateOnly? Advicedate { get; set; }

    public string? Consignor { get; set; }

    public string? Destination { get; set; }

    public string? Cargoweight { get; set; }

    public string? Pkgs { get; set; }

    public string? Transname { get; set; }

    public string? Pono { get; set; }

    public string? Consno { get; set; }

    public string? Consdate { get; set; }

    public string? Vehicleno { get; set; }

    public string? Discport { get; set; }

    public string? Pdesc { get; set; }

    public string? Pkgtype { get; set; }

    public string? Qtyunit { get; set; }

    public string? Shiptype { get; set; }

    public string? Delvtype { get; set; }

    public string? Conttype { get; set; }

    public int? Cnt20 { get; set; }

    public int? Cnt40 { get; set; }

    public string? Bondjobno { get; set; }

    public int? Assvvalue { get; set; }

    public string? Loccode { get; set; }

    public string? Divcode { get; set; }

    public string? Impexp { get; set; }

    public string? Fsb { get; set; }

    public string? Fcb { get; set; }

    public DateOnly? Clrndate { get; set; }

    public string? Remark1 { get; set; }

    public string? Remark2 { get; set; }

    public int? Yr { get; set; }

    public string? Vchno { get; set; }

    public DateOnly? Billdate { get; set; }

    public string? Accode { get; set; }

    public string? Curr { get; set; }

    public int? Drate { get; set; }

    public string? Invremarks { get; set; }

    public string? Dt { get; set; }

    public string? Costcenter1 { get; set; }

    public string? Costcenter2 { get; set; }

    public string? Costcenter3 { get; set; }

    public string? Costcenter4 { get; set; }

    public string? Chargecode { get; set; }

    public string? Chgname { get; set; }

    public string? Paidto { get; set; }

    public string? Rno { get; set; }

    public DateTime? Rdate { get; set; }

    public string? Invnarration { get; set; }

    public string? Qty { get; set; }

    public string? Rate { get; set; }

    public int? Amount { get; set; }

    public string? Seq { get; set; }

    public string? Encltype { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
