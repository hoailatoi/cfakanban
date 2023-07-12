using FE.Services.Domain.ConnectContext.DashboardServer;
using FE.Services.Domain.ConnectContext.ITS;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FE.Services.Application.Services.CFADashboardService
{
    public class CFADashboardService : ICFADashboardService
    {
        private readonly DashboardServerDbContext _dashboardServerDbContext;

        public CFADashboardService(DashboardServerDbContext dashboardServerDbContext)
        {
            _dashboardServerDbContext = dashboardServerDbContext;
        }

        public string GetCFADashboardData(string areaLine)
        {
            var connectionString = _dashboardServerDbContext.Database.GetConnectionString();
            SqlConnection connection = null;
            string result = null;

            try
            {
                connection = new SqlConnection(connectionString);
                connection.Open();

                using (var command = new SqlCommand("abo.sp_CFAGetForDashboardVSIP2", connection))
                //using (var command = new SqlCommand("dbo.sp_CFABDPGetForDashboard", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@areaLine", areaLine);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            // Giả sử rằng chuỗi JSON trả về nằm ở cột đầu tiên của bảng kết quả
                            result = reader.GetString(0);
                        }
                    }
                }
            }
            catch (Exception)
            {
                //Exception
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                    connection.Dispose();
                }
            }

            return result;
        }
    }
}
