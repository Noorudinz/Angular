using iText.Html2pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Models;

namespace TodoApp.Convertor
{
    public class PDFConventor
    {
        public static void ConvertorToPDF(Bills bill)
        {
            try
            {
                var currentDirectory = System.IO.Directory.GetCurrentDirectory();
               
                String invoiceHtmlFormat = currentDirectory + "/Resources/invoiceHTML/invoice.html";                

                string htmlString = File.ReadAllText(invoiceHtmlFormat);
                htmlString = htmlString.Replace("{{FirstName}}", bill.FirstName).Replace("{{Address}}", bill.Address).Replace("{{Mobile}}", bill.MobileNumber)
                    .Replace("{{Email}}", bill.Email1).Replace("{{FlatNo}}", bill.FlatNo).Replace("{{BillNo}}", bill.BillNo.ToString()).Replace("{{DueDate}}", bill.due_date.ToString())
                    .Replace("{{CycleFrom}}", bill.cycle_from.ToString()).Replace("{{CycleTo}}", bill.cycle_to.ToString()).Replace("{{BTUCurrentReading}}", bill.btu_current.ToString()).Replace("{{BTUPreviousReading}}", bill.btu_prev.ToString())
                    .Replace("{{BTUConsumption}}", bill.btu_consum.ToString()).Replace("{{BTUPriceFactor}}", "0.5").Replace("{{BTUCharges}}", bill.BTU_amount.ToString()).Replace("{{WaterCurrentReading}}", bill.water_current.ToString())
                    .Replace("{{WaterPreviousReading}}", bill.water_prev.ToString()).Replace("{{WaterConsumption}}", bill.water_consum.ToString()).Replace("{{WaterPriceFactor}}", "0.750").Replace("{{WaterCharges}}", bill.water_amount.ToString())
                    .Replace("{{ElectCurrentReading}}", bill.elec_current.ToString()).Replace("{{ElectPreviousReading}}", bill.elec_prev.ToString()).Replace("{{ElectConsumption}}", bill.elec_consum.ToString()).Replace("{{ElectPriceFactor}}", "0.6")
                    .Replace("{{ElectCharges}}", bill.electricity_amount.ToString()).Replace("{{SubTotal}}", bill.current_bill.ToString()).Replace("{{ServiceCharge}}", bill.service_charge.ToString()).Replace("{{OtherCharge}}", bill.other_charge.ToString())
                    .Replace("{{PreviousArrear}}", bill.previous_arrear.ToString()).Replace("{{TotalAmount}}", bill.Amount.ToString());

                System.IO.File.WriteAllText(currentDirectory + "/Resources/invoiceHTML/Bill/"+ bill.FlatNo +"_invoice.html", htmlString);

                String htmlFilePath = currentDirectory + "/Resources/invoiceHTML/Bill/" + bill.FlatNo + "_invoice.html";

                String pdfStorePath = currentDirectory + "/Resources/InvoicePDF/" + bill.FlatNo + "_invoice.pdf";              

                HtmlConverter.ConvertToPdf(new FileStream(htmlFilePath, FileMode.Open, FileAccess.Read, FileShare.None), new FileStream(pdfStorePath, FileMode.Create));
            }
            catch (Exception ex)
            {

            }
        }
    }
}
