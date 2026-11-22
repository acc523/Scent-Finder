// ScentFinder response collector — paste into the Google Sheet via Extensions > Apps Script.
// Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
// Each POST from the quiz becomes one row in the "Responses" tab, matched by header name.

const SHEET_NAME = "Responses";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map(h => {
      if (h === "timestamp") return new Date();
      const v = data[h];
      if (v === undefined || v === null) return "";
      // keep free text as text (stops "=..." being read as a formula)
      return (typeof v === "string" && /^[=+\-@]/.test(v)) ? "'" + v : v;
    });
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Visiting the /exec URL in a browser should show this — a quick check the deployment is live.
function doGet() {
  return ContentService.createTextOutput("ScentFinder collector is running.");
}
