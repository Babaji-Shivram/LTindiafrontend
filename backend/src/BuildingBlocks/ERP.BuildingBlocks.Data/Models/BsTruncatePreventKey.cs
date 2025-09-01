using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTruncatePreventKey
{
    public int Lid { get; set; }

    public int AlertId { get; set; }

    public int JobDetailsId { get; set; }

    public int Igmid { get; set; }

    public int Doid { get; set; }

    public int NotingId { get; set; }

    public int DutyId { get; set; }

    public int PassingId { get; set; }

    public int DeliveryId { get; set; }

    public int ChecklistId { get; set; }

    public int EnquiryId { get; set; }

    public int FrbookingId { get; set; }

    public long InvoiceId { get; set; }

    public long ProductId { get; set; }

    public int CustomerId { get; set; }

    public int MaintenanceId { get; set; }

    public virtual BsCheckListDetail Checklist { get; set; } = null!;

    public virtual BsCustomerM Customer { get; set; } = null!;

    public virtual BsJobDeliveryDetail Delivery { get; set; } = null!;

    public virtual BsJobDocollection Do { get; set; } = null!;

    public virtual BsDutyStatusDetail Duty { get; set; } = null!;

    public virtual FrEnquiry Enquiry { get; set; } = null!;

    public virtual FopBooking Frbooking { get; set; } = null!;

    public virtual BsIgmdetail Igm { get; set; } = null!;

    public virtual BsProductInvoiceDetail Invoice { get; set; } = null!;

    public virtual TrMaintenanceWork Maintenance { get; set; } = null!;

    public virtual BsJobNotingDetail Noting { get; set; } = null!;

    public virtual BsJobPassingDetail Passing { get; set; } = null!;
}
