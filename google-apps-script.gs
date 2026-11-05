/*
  OPCIONAL: REGISTRO DE SOLICITUDES EN GOOGLE SHEETS
  1. Crea una hoja de cálculo y copia su ID desde la URL.
  2. En Extensiones > Apps Script, pega este código.
  3. Reemplaza SPREADSHEET_ID.
  4. Implementar > Nueva implementación > Aplicación web.
     Ejecutar como: Yo. Acceso: Cualquier persona.
  5. Copia la URL /exec en config.js: googleSheetsEndpoint.
  Nota: protege el acceso a la hoja y evita almacenar datos sensibles innecesarios.
*/
const SPREADSHEET_ID = "REEMPLAZAR_CON_ID_DE_TU_HOJA";
const SHEET_NAME = "Solicitudes";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Fecha de registro", "Negocio", "Nombre", "Fecha solicitada",
        "Personas", "Tipo de visita", "Teléfono", "Detalles"]);
    }
    sheet.appendRow([
      new Date(), data.business || "", data.name || "", data.date || "",
      data.people || "", data.eventType || "", data.phone || "", data.notes || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
