using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerBillingRule
{
    public int Lid { get; set; }

    public int BillingRuleTypeId { get; set; }

    public int CustomerId { get; set; }

    public int RuleValue { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
