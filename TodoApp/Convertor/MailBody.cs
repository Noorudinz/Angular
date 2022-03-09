using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Convertor
{
    public class MailBody
    {
        public static string GetMailBodyText(string Name, DateTime period)
        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();

            String bodyFormat = currentDirectory + "/Resources/MailBody/body.txt";

            string txtString = File.ReadAllText(bodyFormat);

            txtString = txtString.Replace("{{FirstName}}", Name).Replace("{{Period}}", period.Date.ToString("MMMM"));

            System.IO.File.WriteAllText(currentDirectory + "/Resources/MailBody/Generate/mailBody.txt", txtString);

            string mailBody = File.ReadAllText(currentDirectory + "/Resources/MailBody/Generate/mailBody.txt");

            return mailBody;
        }
    }
}
