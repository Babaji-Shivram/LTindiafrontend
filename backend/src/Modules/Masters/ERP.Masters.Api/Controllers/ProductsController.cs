using Microsoft.AspNetCore.Mvc;

namespace ERP.Masters.Api.Controllers;

[ApiController]
[Route("api/v1/masters/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(ILogger<ProductsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetProducts()
    {
        // This endpoint will be protected by the User Access Management middleware
        // The token validation will happen in the gateway before reaching here
        
        var products = new[]
        {
            new { Id = 1, Name = "Product 1", Price = 100.00 },
            new { Id = 2, Name = "Product 2", Price = 150.00 },
            new { Id = 3, Name = "Product 3", Price = 200.00 }
        };

        _logger.LogInformation("Retrieved {ProductCount} products", products.Length);
        return Ok(products);
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] CreateProductRequest request)
    {
        // This endpoint requires 'write' permission
        var product = new { Id = 4, Name = request.Name, Price = request.Price };
        
        _logger.LogInformation("Created new product: {ProductName}", request.Name);
        return CreatedAtAction(nameof(GetProducts), product);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        // This endpoint requires 'delete' permission
        _logger.LogInformation("Deleted product with ID: {ProductId}", id);
        return NoContent();
    }
}

public class CreateProductRequest
{
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}
