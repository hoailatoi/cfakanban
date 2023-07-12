using FE.Services.Domain.ConnectContext.ITS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FE.Services.Domain.ConnectContext.DashboardServer
{
    public class DashboardServerDbContext : DbContext
    {
        public DashboardServerDbContext(DbContextOptions<DashboardServerDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Cấu hình mapping giữa các Entity và bảng trong cơ sở dữ liệu
            // ví dụ:
            // modelBuilder.Entity<YourEntity>(entity =>
            // {
            //     entity.ToTable("YourTableName");
            // });
        }
    }
}
