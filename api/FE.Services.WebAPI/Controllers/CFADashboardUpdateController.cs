using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Hosting.Internal;

namespace FE.Services.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/cfadashboardupdate")]
    [ApiExplorerSettings(GroupName = "CFADashboardUpdate")]
    public class CFADashboardUpdateController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ILogger<CFADashboardUpdateController> _logger;

        public CFADashboardUpdateController(ILogger<CFADashboardUpdateController> logger, IWebHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet("get-update/{ipaddress}/{platform}/{version}/{filename}", Name = "cfadashboardupdate")]
        public async Task<IActionResult> GetCFADashboarUpdate(string platform, string version, string ipaddress, string filename)
        {
            if (platform != "win32" && platform != "darwin")
            {
                return BadRequest("Invalid OS specified.");
            }
            if (!IpAddressAllowed(ipaddress))
            {
                return Unauthorized("Your IP address is not allowed.");
            }
            var env = _hostingEnvironment.ContentRootPath;
            var updateFilePath = Path.Combine(env, "..", "FE.Services.Infrastructure", "Files", "CFADashboardUpdate", platform, filename);

            if (!System.IO.File.Exists(updateFilePath))
            {
                return NotFound("Update file not found.");
            }

            var fileStream = new FileStream(updateFilePath, FileMode.Open, FileAccess.Read);
            var fileProvider = new FileExtensionContentTypeProvider();

            if (!fileProvider.TryGetContentType(filename, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            return File(fileStream, contentType, filename);
        }

        public static bool IpAddressAllowed(string ipAddress)
        {
            var ip = System.Net.IPAddress.Parse(ipAddress);
            var bytes = ip.GetAddressBytes();

            return (bytes[0] == 10 && (bytes[1] == 20 || bytes[1] == 17));
        }
    }
}
