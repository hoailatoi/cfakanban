using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FE.Services.Domain.ConnectContext.ITS
{
    public class ITSDbContext : DbContext
    {
        public ITSDbContext(DbContextOptions<ITSDbContext> options)
            : base(options)
        {
        }
        // Định nghĩa DbSet cho các Entity

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
