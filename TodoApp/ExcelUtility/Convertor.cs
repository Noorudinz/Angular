using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using iText.Html2pdf;

namespace TodoApp.ExcelUtility
{
    public class Convertor
    {
        public static void ConvertorToPDF()
        {
            try
            {
                var currentDirectory = System.IO.Directory.GetCurrentDirectory();
                String htmlFilePath = currentDirectory + "/Resources/invoiceHTML/invoice.html";
                String pdfStorePath = currentDirectory + "/Resources/InvoicePDF/invoice.pdf";
                string html = File.ReadAllText(htmlFilePath);               
                //HtmlConverter.ConvertToPdf(new FileStream(htmlFilePath, FileMode.Open, FileAccess.Read, FileShare.Read), new FileStream(pdfStorePath, FileMode.Create));
            }
            catch(Exception ex)
            {

            }
        }
    }
}
