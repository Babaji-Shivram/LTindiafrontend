using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ERP.Api.Controllers;

[ApiController]
[Route("api/v1/masters/[controller]")]
[Authorize]
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
        // This endpoint will be protected by JWT authentication
        var products = new[]
        {
            new { Id = 1, Name = "Product 1", Price = 100.00, Category = "Electronics" },
            new { Id = 2, Name = "Product 2", Price = 150.00, Category = "Clothing" },
            new { Id = 3, Name = "Product 3", Price = 200.00, Category = "Books" }
        };

        _logger.LogInformation("Retrieved {ProductCount} products", products.Length);
        return Ok(new { data = products, count = products.Length });
    }

    [HttpGet("{id}")]
    public IActionResult GetProduct(int id)
    {
        var product = new { Id = id, Name = $"Product {id}", Price = 100.00 + id * 10, Category = "Electronics" };
        
        _logger.LogInformation("Retrieved product with ID: {ProductId}", id);
        return Ok(product);
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] CreateProductRequest request)
    {
        // This endpoint requires 'write' permission
        var product = new { Id = 4, Name = request.Name, Price = request.Price, Category = request.Category };
        
        _logger.LogInformation("Created new product: {ProductName}", request.Name);
        return CreatedAtAction(nameof(GetProduct), new { id = 4 }, product);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, [FromBody] CreateProductRequest request)
    {
        var product = new { Id = id, Name = request.Name, Price = request.Price, Category = request.Category };
        
        _logger.LogInformation("Updated product with ID: {ProductId}", id);
        return Ok(product);
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
    public string Category { get; set; } = string.Empty;
}
