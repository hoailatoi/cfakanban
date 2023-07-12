using FE.Services.Application.Services.CFADashboardService;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FE.Services.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/cfadashboard")]
    [ApiExplorerSettings(GroupName = "CFADashboard")]
    public class CFADashboardController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ILogger<CFADashboardController> _logger;
        private readonly ICFADashboardService _cfADashboardService;
        public CFADashboardController(ILogger<CFADashboardController> logger, IWebHostEnvironment hostEnvironment, ICFADashboardService cFADashboardService)
        {
            _logger = logger;
            _hostingEnvironment = hostEnvironment;
            _cfADashboardService = cFADashboardService;
        }

        [HttpPost("getcfadashboarddata", Name = "cfadashboarddata")]
        public IActionResult GetCFADashboardData([FromBody] CFADashboardRequest request)
        {
            var result = _cfADashboardService.GetCFADashboardData(request.areaLine);

            if (result == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Data not found"
                });
            }

            return Ok(new
            {
                StatusCode = 200,
                Data = result
            });
        }

        // Define a request model
        public class CFADashboardRequest
        {
            public string? areaLine { get; set; }
        }
    }
}
