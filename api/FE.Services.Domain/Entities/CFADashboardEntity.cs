using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FE.Services.Domain.Entities
{
    public class CFADashboardEntity
    {
        public string? BatchNumber { get; set; }
        public string? LineName { get; set; }
        public string? FEPOCode { get; set; }
        public int BatchQuantity { get; set; }
        public int POQuantity { get; set; }
        public string? FoldingScanTime { get; set; }
        public decimal? POSampleSize { get; set; }
        public decimal? POSampleSizeRate { get; set; }
        public decimal? PickUpQuantity { get; set; }
        public string? CFAResult { get; set; }
        public string? CFAScanTime { get; set; }
    }
}
