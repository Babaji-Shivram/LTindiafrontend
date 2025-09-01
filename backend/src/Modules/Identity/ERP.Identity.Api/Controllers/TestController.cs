// using Microsoft.AspNetCore.Mvc;

// namespace ERP.Identity.Api.Controllers;

// [ApiController]
// [Route("api/v1/identity/[controller]")]
// public class TestController : ControllerBase
// {
//     [HttpPost("login")]
//     public IActionResult Login([FromBody] object request)
//     {
//         return Ok(new
//         {
//             message = "Login endpoint is working",
//             timestamp = DateTime.UtcNow,
//             token = "test-jwt-token",
//             refreshToken = "test-refresh-token",
//             expiresAt = DateTime.UtcNow.AddHours(1).ToString("o"),
//             user = new
//             {
//                 id = 1,
//                 username = "testuser",
//                 email = "testuser@ltindia.com",
//                 firstName = "Test",
//                 lastName = "User",
//                 roles = new[] { "User" },
//                 permissions = new[] { "read", "write" }
//             }
//         });
//     }

//     [HttpGet("health")]
//     public IActionResult Health()
//     {
//         return Ok(new { status = "healthy", service = "Identity API Test" });
//     }
// }
