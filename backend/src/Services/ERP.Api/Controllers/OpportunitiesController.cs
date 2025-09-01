using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ERP.Api.Controllers;

[ApiController]
[Route("api/v1/crm/[controller]")]
[Authorize]
public class OpportunitiesController : ControllerBase
{
    private readonly ILogger<OpportunitiesController> _logger;

    public OpportunitiesController(ILogger<OpportunitiesController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetOpportunities([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var opportunities = new[]
        {
            new { Id = 1, Name = "ABC Corp - Import Services", Stage = "Qualification", Value = 50000, CloseDate = DateTime.UtcNow.AddDays(30) },
            new { Id = 2, Name = "XYZ Ltd - Export Services", Stage = "Proposal", Value = 75000, CloseDate = DateTime.UtcNow.AddDays(45) },
            new { Id = 3, Name = "123 Inc - Logistics", Stage = "Negotiation", Value = 100000, CloseDate = DateTime.UtcNow.AddDays(15) }
        };

        var pagedOpportunities = opportunities.Skip((page - 1) * pageSize).Take(pageSize);

        _logger.LogInformation("Retrieved {OpportunityCount} opportunities for page {Page}", pagedOpportunities.Count(), page);
        return Ok(new { data = pagedOpportunities, page, pageSize, total = opportunities.Length });
    }

    [HttpGet("{id}")]
    public IActionResult GetOpportunity(int id)
    {
        var opportunity = new 
        { 
            Id = id, 
            Name = $"Opportunity {id}", 
            Stage = "Qualification",
            Value = 50000 + (id * 10000),
            Probability = 60,
            CloseDate = DateTime.UtcNow.AddDays(30),
            AccountName = $"Account {id}",
            ContactName = $"Contact {id}",
            Description = "Import/Export services requirement",
            CreatedDate = DateTime.UtcNow.AddDays(-id * 5)
        };
        
        _logger.LogInformation("Retrieved opportunity with ID: {OpportunityId}", id);
        return Ok(opportunity);
    }

    [HttpPost]
    public IActionResult CreateOpportunity([FromBody] CreateOpportunityRequest request)
    {
        var opportunity = new 
        { 
            Id = new Random().Next(1000, 9999), 
            Name = request.Name, 
            Stage = "Qualification",
            Value = request.Value,
            Probability = 20,
            CloseDate = request.CloseDate,
            AccountName = request.AccountName,
            ContactName = request.ContactName,
            Description = request.Description,
            CreatedDate = DateTime.UtcNow
        };
        
        _logger.LogInformation("Created new opportunity: {OpportunityName}", request.Name);
        return CreatedAtAction(nameof(GetOpportunity), new { id = opportunity.Id }, opportunity);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateOpportunity(int id, [FromBody] UpdateOpportunityRequest request)
    {
        var opportunity = new 
        { 
            Id = id, 
            Name = request.Name, 
            Stage = request.Stage,
            Value = request.Value,
            Probability = request.Probability,
            CloseDate = request.CloseDate,
            AccountName = request.AccountName,
            ContactName = request.ContactName,
            Description = request.Description,
            UpdatedDate = DateTime.UtcNow
        };
        
        _logger.LogInformation("Updated opportunity with ID: {OpportunityId}", id);
        return Ok(opportunity);
    }

    [HttpPost("{id}/approve")]
    public IActionResult ApproveOpportunity(int id)
    {
        _logger.LogInformation("Approved opportunity with ID: {OpportunityId}", id);
        return Ok(new { Id = id, Status = "Approved", ApprovedDate = DateTime.UtcNow });
    }

    [HttpPost("{id}/win")]
    public IActionResult WinOpportunity(int id, [FromBody] WinOpportunityRequest request)
    {
        // This would typically:
        // 1. Update opportunity stage to "Closed Won"
        // 2. Create/update Party record in Masters module
        // 3. Create account record
        
        var result = new 
        { 
            Id = id, 
            Stage = "Closed Won",
            ActualValue = request.ActualValue,
            WinDate = DateTime.UtcNow,
            WinReason = request.WinReason,
            AccountId = new Random().Next(1000, 9999) // Would be created in Masters module
        };
        
        _logger.LogInformation("Won opportunity {OpportunityId} with value {ActualValue}", id, request.ActualValue);
        return Ok(result);
    }

    [HttpPost("{id}/lose")]
    public IActionResult LoseOpportunity(int id, [FromBody] LoseOpportunityRequest request)
    {
        var result = new 
        { 
            Id = id, 
            Stage = "Closed Lost",
            LoseDate = DateTime.UtcNow,
            LoseReason = request.LoseReason,
            CompetitorName = request.CompetitorName
        };
        
        _logger.LogInformation("Lost opportunity {OpportunityId} - Reason: {LoseReason}", id, request.LoseReason);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOpportunity(int id)
    {
        _logger.LogInformation("Deleted opportunity with ID: {OpportunityId}", id);
        return NoContent();
    }
}

public class CreateOpportunityRequest
{
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public DateTime CloseDate { get; set; }
    public string AccountName { get; set; } = string.Empty;
    public string ContactName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class UpdateOpportunityRequest : CreateOpportunityRequest
{
    public string Stage { get; set; } = "Qualification";
    public int Probability { get; set; } = 20;
}

public class WinOpportunityRequest
{
    public decimal ActualValue { get; set; }
    public string WinReason { get; set; } = string.Empty;
}

public class LoseOpportunityRequest
{
    public string LoseReason { get; set; } = string.Empty;
    public string CompetitorName { get; set; } = string.Empty;
}
