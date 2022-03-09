using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Models;

namespace TodoApp.ExcelUtility
{
    public class ImportExcelUtility
    {
        public static List<BTU> Read(string fullPath)
        {
            DataTable dt = new DataTable();

            using (SpreadsheetDocument spreadSheetDocument = SpreadsheetDocument.Open(fullPath, false))
            {
                WorkbookPart workbookPart = spreadSheetDocument.WorkbookPart;
                IEnumerable<Sheet> sheets = spreadSheetDocument.WorkbookPart.Workbook.GetFirstChild<Sheets>().Elements<Sheet>();
                string relationshipId = sheets.First().Id.Value;
                WorksheetPart worksheetPart = (WorksheetPart)spreadSheetDocument.WorkbookPart.GetPartById(relationshipId);
                Worksheet workSheet = worksheetPart.Worksheet;
                SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                IEnumerable<Row> rows = sheetData.Descendants<Row>();

                foreach (Cell cell in rows.ElementAt(0))
                {
                    dt.Columns.Add(GetCellValue(spreadSheetDocument, cell));
                }

                foreach (Row row in rows) //this will also include your header row...
                {
                    DataRow tempRow = dt.NewRow();

                    for (int i = 0; i < row.Descendants<Cell>().Count(); i++)
                    {
                        tempRow[i] = GetCellValue(spreadSheetDocument, row.Descendants<Cell>().ElementAt(i));
                    }

                    dt.Rows.Add(tempRow);
                }
            }

            dt.Rows.RemoveAt(0); //...so i'm taking it out here.

            List<BTU> btuList = new List<BTU>();

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                BTU btu = new BTU();
                btu.FlatNo = (dt.Rows[i]["FlatNo"]).ToString();
                btu.MeterID = dt.Rows[i]["MeterID"].ToString();
                btu.Reading = Convert.ToDecimal(dt.Rows[i]["Reading"]);             
                btuList.Add(btu);
            }

           return btuList;
        }

        public static string GetCellValue(SpreadsheetDocument document, Cell cell)
        {
            try
            {
                SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
                string value = cell.CellValue.InnerXml;

                if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
                {
                    return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
                }
                else
                {
                    return value;
                }
            }
            catch(Exception ex)
            {
                return ex.ToString();
            }
         
        }
    }
}
