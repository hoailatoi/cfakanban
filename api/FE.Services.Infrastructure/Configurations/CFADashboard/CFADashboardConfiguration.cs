using FE.Services.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FE.Services.Infrastructure.Configurations.CFADashboard
{
    public class CFADashboardConfiguration : IEntityTypeConfiguration<CFADashboardEntity>
    {
        public void Configure(EntityTypeBuilder<CFADashboardEntity> builder)
        {
            //
        }
    }
}
