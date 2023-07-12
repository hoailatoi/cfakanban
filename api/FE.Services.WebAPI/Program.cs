using FE.Services.Application.Services.CFADashboardService;
using FE.Services.Domain.ConnectContext.DashboardServer;
using FE.Services.Domain.ConnectContext.ITS;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("CFADashboard", new OpenApiInfo { Title = "CFADashboard API", Version = "v1" });
    c.SwaggerDoc("CFADashboardUpdate", new OpenApiInfo { Title = "CFADashboardUpdate API", Version = "v1" });
    c.SwaggerDoc("WeatherForecast", new OpenApiInfo { Title = "WeatherForecast API", Version = "v1" });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("ElectronAppPolicy",
        builder => builder
            //.WithOrigins("electronapp")
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
// Add DbContext configuration
builder.Services.AddDbContext<DashboardServerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ITSConnection")));

    //options.UseSqlServer(builder.Configuration.GetConnectionString("DashboardServerConnection")));

//builder.Services.AddDbContext<AnotherDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("AnotherDbConnection")));

//Declare DI
builder.Services.AddTransient<ICFADashboardService, CFADashboardService>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger(c =>
    {
        c.RouteTemplate = "api-docs/{documentName}/swagger.json";
    });
    app.UseSwaggerUI(c =>
    {
        c.RoutePrefix = "api-docs";
        c.SwaggerEndpoint("CFADashboard/swagger.json", "CFADashboard API v1");
        c.SwaggerEndpoint("CFADashboardUpdate/swagger.json", "CFADashboardUpdate API v1");
        c.SwaggerEndpoint("WeatherForecast/swagger.json", "WeatherForecast API v1");
        c.DocumentTitle = "FE Services UI";
        //c.InjectStylesheet("/custom-styles.css");
    });
}
app.UseCors("ElectronAppPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
