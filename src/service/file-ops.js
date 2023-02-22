import * as XLSX from "xlsx";

export const jsonToExcel = (data, fileName) => {
  const workbook = createExcelWorkBook()
  const worksheet = createExcelWorkSheet(data)

  saveAsExcelFile(workbook, worksheet, fileName)
}

export const createExcelWorkBook = () => {
  return XLSX.utils.book_new()
}

// Create excel worksheet.
export const createExcelWorkSheet = (json) => {
  return XLSX.utils.json_to_sheet(json)
}

// Append to excel worksheet.
export const appendToExcelWorkSheet = (worksheet, json) => {
  XLSX.utils.sheet_add_json(worksheet, json, { skipHeader: true, origin: -1 })
}

// Save the excel file.
export const saveAsExcelFile = (workbook, worksheet, fileName) => {
  XLSX.utils.book_append_sheet(workbook, worksheet, 'transactions')
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}