using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class Leave_Controller : Controller
    {
        private string connectionString;
        public void DBconnection()
        {
            connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
        }

        // GET: Leave_
       
        public ActionResult Index()
        {
            DBconnection();
            //GetData();
            return View();
        }

        public ActionResult GetData1 ()
        {
            List<EMP_Data> dt = new List<EMP_Data>();
            string query = "SELECT * FROM UsersList";
            
            using (SqlConnection sql = new SqlConnection(connectionString))
            {
                if (sql.State != ConnectionState.Open)
                {
                    sql.Open();
                }
                using (SqlCommand cmd = new SqlCommand(query, sql))
                {
                    try
                    {
                        SqlDataReader r = cmd.ExecuteReader();
                        while (r.Read())
                        {
                            dt.Add(new EMP_Data
                            {
                                name = (string)r[0],
                                vid = (string) r[1]
                            });
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Something went wrong");
                    }
                    string stringjson = JsonConvert.SerializeObject(dt);
                    Debug.WriteLine(stringjson);
                    
                }
            }
            return Json(dt, JsonRequestBehavior.AllowGet);
        }
    }

}
