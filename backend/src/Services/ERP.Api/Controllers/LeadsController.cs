using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ERP.Api.Controllers;

[ApiController]
[Route("api/v1/crm/[controller]")]
[Authorize]
public class LeadsController : ControllerBase
{
    private readonly ILogger<LeadsController> _logger;

    public LeadsController(ILogger<LeadsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetLeads([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var leads = new[]
        {
            new { Id = 1, CompanyName = "ABC Corp", ContactName = "John Doe", Email = "john@abc.com", Status = "New", Source = "Website" },
            new { Id = 2, CompanyName = "XYZ Ltd", ContactName = "Jane Smith", Email = "jane@xyz.com", Status = "Qualified", Source = "Referral" },
            new { Id = 3, CompanyName = "123 Inc", ContactName = "Bob Johnson", Email = "bob@123.com", Status = "Contacted", Source = "Cold Call" }
        };

        var pagedLeads = leads.Skip((page - 1) * pageSize).Take(pageSize);

        _logger.LogInformation("Retrieved {LeadCount} leads for page {Page}", pagedLeads.Count(), page);
        return Ok(new { data = pagedLeads, page, pageSize, total = leads.Length });
    }

    [HttpGet("{id}")]
    public IActionResult GetLead(int id)
    {
        var lead = new 
        { 
            Id = id, 
            CompanyName = $"Company {id}", 
            ContactName = $"Contact {id}", 
            Email = $"contact{id}@company.com", 
            Phone = "+1234567890",
            Status = "New", 
            Source = "Website",
            Requirements = "Import/Export services",
            Budget = 50000,
            CreatedDate = DateTime.UtcNow.AddDays(-id)
        };
        
        _logger.LogInformation("Retrieved lead with ID: {LeadId}", id);
        return Ok(lead);
    }

    [HttpPost]
    public IActionResult CreateLead([FromBody] CreateLeadRequest request)
    {
        var lead = new 
        { 
            Id = new Random().Next(1000, 9999), 
            CompanyName = request.CompanyName, 
            ContactName = request.ContactName,
            Email = request.Email,
            Phone = request.Phone,
            Status = "New",
            Source = request.Source,
            Requirements = request.Requirements,
            Budget = request.Budget,
            CreatedDate = DateTime.UtcNow
        };
        
        _logger.LogInformation("Created new lead for company: {CompanyName}", request.CompanyName);
        return CreatedAtAction(nameof(GetLead), new { id = lead.Id }, lead);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateLead(int id, [FromBody] UpdateLeadRequest request)
    {
        var lead = new 
        { 
            Id = id, 
            CompanyName = request.CompanyName, 
            ContactName = request.ContactName,
            Email = request.Email,
            Phone = request.Phone,
            Status = request.Status,
            Source = request.Source,
            Requirements = request.Requirements,
            Budget = request.Budget,
            UpdatedDate = DateTime.UtcNow
        };
        
        _logger.LogInformation("Updated lead with ID: {LeadId}", id);
        return Ok(lead);
    }

    [HttpPost("{id}/convert")]
    public IActionResult ConvertToOpportunity(int id)
    {
        var opportunity = new 
        { 
            Id = new Random().Next(1000, 9999),
            LeadId = id, 
            Name = $"Opportunity from Lead {id}",
            Stage = "Qualification",
            Value = 75000,
            CloseDate = DateTime.UtcNow.AddDays(30),
            CreatedDate = DateTime.UtcNow
        };
        
        _logger.LogInformation("Converted lead {LeadId} to opportunity {OpportunityId}", id, opportunity.Id);
        return Ok(opportunity);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteLead(int id)
    {
        _logger.LogInformation("Deleted lead with ID: {LeadId}", id);
        return NoContent();
    }
}

public class CreateLeadRequest
{
    public string CompanyName { get; set; } = string.Empty;
    public string ContactName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Source { get; set; } = "Website";
    public string Requirements { get; set; } = string.Empty;
    public decimal Budget { get; set; }
}

public class UpdateLeadRequest : CreateLeadRequest
{
    public string Status { get; set; } = "New";
}
