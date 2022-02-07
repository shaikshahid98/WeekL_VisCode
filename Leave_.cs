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
using Spire.Xls;
using System.Windows;
using System.Collections;
using System.Drawing;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.Common;
using Microsoft.TeamFoundation.Core.WebApi;
using Microsoft.TeamFoundation.Framework.Client;
using Microsoft.TeamFoundation.Server;
using Microsoft.TeamFoundation.WorkItemTracking.Client.DataStore;
using Microsoft.TeamFoundation.WorkItemTracking.Client.Internal;
using Microsoft.TeamFoundation.WorkItemTracking.Client.Metadata;
using Microsoft.TeamFoundation.WorkItemTracking.Client.Provision;
using Microsoft.TeamFoundation.WorkItemTracking.Common;
using Microsoft.TeamFoundation.WorkItemTracking.Common.DataStore;
using Microsoft.TeamFoundation.WorkItemTracking.Internals;
using Microsoft.TeamFoundation.WorkItemTracking.Proxy;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.Common.Internal;
using System.IO;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Microsoft.VisualStudio.Services.Client;
using System.Web.Hosting;

namespace WebApplication2.Controllers
{
    public class Leave_Controller : Controller
    {
       
        public ActionResult Index()
        {
            Console.WriteLine("UserName: {0}", Environment.UserName);
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
            if(obj.Count ==0 || obj==null)
            {
                return Json(new ActionInfo()
                {
                    Success = true
                });
            }

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
        
        public ActionResult Get_Prev_week_data(List<Prev_week> obj)
        {
            string connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
            Debug.WriteLine(obj);
            List<Week_status_data> dt = new List<Week_status_data>();
            try
            {
                using (SqlConnection sql = new SqlConnection(connectionString))
                {
                    if (sql.State != ConnectionState.Open)
                    {
                        sql.Open();
                    }
                    obj.ForEach(x =>
                    {
                        string query = "select * from WeeklyEfforts where Date_ = @date";
                        Debug.WriteLine(x.week_);
                        using (SqlCommand cmd = new SqlCommand(query, sql))
                        {
                            cmd.Parameters.AddWithValue("@date", (string)x.week_);
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
                                    });
                                }
                                r.Close();
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine("Something went wrong");
                            }
                            string stringjson = JsonConvert.SerializeObject(dt);
                            //Debug.WriteLine(stringjson);

                        }
                    });
                }
            }
            catch (Exception e)
            {

            }
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Export_excel(List<List<string>> obj)
        {
            //Debug.WriteLine(obj);
            
            DateTime start = DateTime.Now;
            Workbook workbook = new Workbook();
            workbook.Worksheets.Add("Employee Data");
            Worksheet sheet = workbook.Worksheets["Employee Data"];



            ColorConverter cc = new ColorConverter();

            for (int i = 0; i < obj.Count; i++)
            {
                List<string> tmp = obj[i];
                for(int j=0;j< tmp.Count; j++)
                {
                    sheet.Range[i + 1, j + 1].Value = tmp[j];
                    CellRange cell = sheet.Range[i + 1, j + 1];
                    cell.Style.Font.Size = 9;
                    cell.Style.Font.FontName = "Calibri";
                    if (tmp[j]=="8")
                    {
                        cell.Style.Color = (Color.FromArgb(198,239,206));
                        cell.Style.Font.Color = (Color.FromArgb(0,97,0));
                        cell.Style.HorizontalAlignment = HorizontalAlignType.Center;
                    }
                    else if (tmp[j]=="0")
                    {
                        cell.Style.Color = (Color.FromArgb(255,196,206));
                        cell.Style.Font.Color = (Color.FromArgb(156, 0, 6));
                        cell.Style.HorizontalAlignment = HorizontalAlignType.Center;
                    }
                    else if(tmp[j]=="Holiday")
                    {
                        cell.Style.Color = (Color.FromArgb(166,166,166));
                        cell.Style.Font.Color = (Color.FromArgb(0, 0, 0));
                        cell.Style.HorizontalAlignment = HorizontalAlignType.Center;
                    }

                }

            }

            workbook.Worksheets.Remove("Sheet1");
            workbook.Worksheets.Remove("Sheet2");
            workbook.Worksheets.Remove("Sheet3");
           // workbook.Worksheets.Remove("Evaluation Warning");


            workbook.SaveToFile("D:/sample.xlsx", ExcelVersion.Version2010);


            ExcelDocViewer("D:/sample.xlsx");

            return Json(new ActionInfo()
            {
                Success = true
            });
        }
        public void ExcelDocViewer(string fileName)
        {
            try
            {
                System.Diagnostics.Process.Start(fileName);
            }
            catch { }
        }

        //public ActionResult About()
        //{
        //    ViewBag.UserName = User.Identity.Name;
        //    //Debug.WriteLine(ViewBag.UserName);
        //    return View();
        //}


        //private WorkItemStore GetWorkItemInstance()
        //{

        //    var vssCred = GetWowRegCredentials();
        //    Uri connectionUri = new Uri(@"https://microsoft.visualstudio.com");
        //    var client = new TfsTeamProjectCollection(connectionUri, vssCred);
        //    return (WorkItemStore)client.GetService(typeof(WorkItemStore));
        //}

        //public VssAadCredential GetWowRegCredentials()
        //{

        //    var filePath = HostingEnvironment.MapPath(@"~/wwwroot/KeyValut/AppSettings.json");

        //    VssAadCredential cred = null;
        //    dynamic settings;
        //    using (StreamReader r = new StreamReader(filePath))
        //    {
        //        string json = r.ReadToEnd();
        //        settings = JsonConvert.DeserializeObject<dynamic>(json);
        //    }
        //    try
        //    {
        //        TfsCredentials tfs = new TfsCredentials(settings.AuthAuthority.ToString(), settings.ProgramId.ToString(), settings.ProgramSecret.ToString(), settings.VaultName.ToString());
        //        cred = tfs.GetVssAadCredential("wowreg", "WOWREG");
        //        return cred;
        //    }
        //    catch (Exception ex)
        //    {

        //        return null;
        //    }

        //}

    }
}
