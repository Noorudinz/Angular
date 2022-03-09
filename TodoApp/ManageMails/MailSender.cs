using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.ManageMails
{
    public class MailSender
    {

        public static void SendEmails(Bills bills, Email email)
        {
            try
            {
                Convertor.PDFConventor.ConvertorToPDF(bills);

                using (MailMessage mail = new MailMessage(email.EmailAddress, "noorudeens@yahoo.in"))
                {
                    mail.Subject = "Utility Bill/s for the period of" + bills.cycle_from.Date + " - " + bills.cycle_to.Date + " [" + bills.FlatNo + "]";

                    mail.Body = Convertor.MailBody.GetMailBodyText(bills.FirstName, bills.cycle_to);

                    var currentDirectory = System.IO.Directory.GetCurrentDirectory();
                    Attachment attachment;
                    attachment = new Attachment(currentDirectory + "/Resources/InvoicePDF/" + bills.FlatNo + "_invoice.pdf");
                    mail.Attachments.Add(attachment);
                    //attachment.Dispose();

                    mail.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = email.Host;
                    smtp.Port = Convert.ToInt32(email.Port);
                    smtp.UseDefaultCredentials = false;
                    smtp.EnableSsl = true;
                    NetworkCredential networkCredential = new NetworkCredential(email.EmailAddress, email.Password);
                    smtp.Credentials = networkCredential;
                    //smtp.Send(mail);
                }                

            }
            catch(IOException ex)
            {
              
            }

        }

        public static void DeleteFiles()
        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();

            var pdfDirectory = currentDirectory + "/Resources/InvoicePDF/";
            var htmlBillDirectory = currentDirectory + "/Resources/invoiceHTML/Bill/";

            var pdfFiles = Directory.GetFiles(pdfDirectory);
            var htmlFiles = Directory.GetFiles(htmlBillDirectory);

            foreach (var file in pdfFiles)
            {
                DeleteFile(file);
            }

            foreach (var file in htmlFiles)
            {
                DeleteFile(file);
            }

        }

        public static void DeleteFile(string path)
        {
            try
            {
                File.Delete(path);
            }
            catch(Exception ex)
            {

            }
        }
    }
}
