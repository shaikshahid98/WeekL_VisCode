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
       
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Get_week_status()
        {
            
            List<Week_status_data> dt = new List<Week_status_data>();
            string query = "SELECT * FROM WeeklyEfforts";
            string connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
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
                           

                            dt.Add(new Week_status_data
                            {
                                name = (string)r[0],
                                vid = (string)r[1],
                                day = (string)r[2],
                                date = (string)r[3],
                                value = (string)r[4]
                            }); ;
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Something went wrong");
                    }
                    string stringjson = JsonConvert.SerializeObject(dt);
                    //Debug.WriteLine(stringjson);
                }
            }
            return Json(dt, JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult GetData1()
        {
            List<EMP_Data> dt = new List<EMP_Data>();
            string query = "SELECT * FROM UsersList";
            string connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
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
                                vid = (string)r[1]
                            });
                           
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Something went wrong");
                    }
                    string stringjson = JsonConvert.SerializeObject(dt);
                    //Debug.WriteLine(stringjson);

                }
            }
            return Json(dt, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Get_upd_Data(List<Upd_EMP_data> obj)
        {
            //var executed = 0;

            string connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
            Debug.WriteLine(obj);
            try
            {
                obj.ForEach(x =>
                {
                    var hasrows = 0;
                    string ckrecord = "Select * from WeeklyEfforts where Empname=@name and Date_= @date";
                    using (SqlConnection sql = new SqlConnection(connectionString))
                    {
                        if (sql.State != ConnectionState.Open)
                        {
                            sql.Open();
                        }
                        using (SqlCommand cmd1 = new SqlCommand(ckrecord, sql))
                        {
                            cmd1.Parameters.AddWithValue("@name", x.Name_);
                            cmd1.Parameters.AddWithValue("@date", x.Date_);
                            try
                            {
                                using (SqlDataReader dr = cmd1.ExecuteReader())
                                {
                                    if (dr.HasRows)
                                    {
                                        hasrows++;
                                    }

                                }
                                //Debug.WriteLine("Data is Present");

                            }
                            catch (Exception e)
                            {
                                Console.WriteLine("Cannot execute query part");

                            }
                        }
                        if (hasrows > 0)
                        {
                            string query = "UPDATE WeeklyEfforts SET Value_= @value WHERE EmpName= @name and Date_ = @date";
                            using (SqlCommand cmd2 = new SqlCommand(query, sql))
                            {
                                cmd2.Parameters.AddWithValue("@name", x.Name_);
                                cmd2.Parameters.AddWithValue("@date", x.Date_);
                                cmd2.Parameters.AddWithValue("@value", x.Value_);
                                try
                                {
                                    cmd2.ExecuteNonQuery();

                                }
                                catch (Exception e)
                                {
                                    Console.WriteLine("Efforts not updated in DB");
                                }
                            }
                            //Week_data[x.Name_][x.Date_] = x.Value_;
                           // Debug.WriteLine("Query is Updated ");

                        }
                        else
                        {
                            string query = "INSERT INTO WeeklyEfforts(EmpName,Vid_,Day_,Date_,Value_)";
                            query += "VALUES (@name, @vid,@day,@date, @value)";
                            using (SqlCommand cmd = new SqlCommand(query, sql))
                            {
                                cmd.Parameters.AddWithValue("@name", x.Name_);
                                cmd.Parameters.AddWithValue("@date", x.Date_);
                                cmd.Parameters.AddWithValue("@value", x.Value_);
                                cmd.Parameters.AddWithValue("@vid", x.Vid_);
                                cmd.Parameters.AddWithValue("@day", x.Day_);
                                try
                                {
                                    cmd.ExecuteNonQuery();
                                }
                                catch (Exception e)
                                {
                                    Console.WriteLine("Efforts not updated in DB");
                                }
                            }
                            
                            //Debug.WriteLine("Query is Created ");
                        }
                        //Debug.WriteLine(Week_data[x.Name_][x.Date_]);

                    }
                });
            }
            catch (Exception e)
            {
                Console.WriteLine("Cannot execute query part");

            }
            //disp_();
            return Json(new ActionInfo()
            {
                Success = true
            });
        }
    }
}
