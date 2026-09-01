/**
 * APC Stakeholders Congress - Google Sheets Webhook Script
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (create a new sheet named "APC Stakeholders Congress Registrations")
 * 2. In the top menu, go to: Extensions > Apps Script
 * 3. Delete any code in the editor and paste this entire code
 * 4. Click "Deploy" (top right) > "New deployment"
 * 5. Select type: "Web app"
 * 6. Under "Execute as", select "Me"
 * 7. Under "Who has access", select "Anyone" (VERY IMPORTANT)
 * 8. Click "Deploy" and copy the Web app URL (e.g. https://script.google.com/macros/s/AKfycb.../exec)
 * 9. Set this URL in your environment as GOOGLE_SHEETS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      var headers = [
        'Timestamp',
        'Registration Ref',
        'Forum Name',
        'Motto',
        'Year Established',
        'Area of Coverage',
        'LGA',
        'Ward / Scope',
        'Office Address',
        'Coordinator Name',
        'Coordinator Phone',
        'Secretary Name',
        'Secretary Phone',
        'Official Forum Email',
        'Member Strength',
        'Capacity Range',
        'Previous Election Activity',
        'Status'
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#005d37').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
    
    var requestData = JSON.parse(e.postData.contents);
    
    if (requestData.action === 'ADD_ROW' && requestData.row) {
      var r = requestData.row;
      var newRow = [
        r.timestamp || new Date().toISOString(),
        r.registrationRef || '',
        r.forumName || '',
        r.motto || '',
        r.yearEstablished || '',
        r.areaOfCoverage || '',
        r.lga || '',
        r.ward || '',
        r.officeAddress || '',
        r.coordinatorName || '',
        r.coordinatorPhone || '',
        r.secretaryName || '',
        r.secretaryPhone || '',
        r.forumEmail || '',
        r.memberStrength || '',
        r.capacityRange || '',
        r.previousElections || '',
        r.status || 'APPROVED_VERIFIED'
      ];
      sheet.appendRow(newRow);
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Row added' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (requestData.action === 'BATCH_SYNC' && requestData.rows && requestData.rows.length > 0) {
      var rows = requestData.rows;
      for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        sheet.appendRow([
          r.timestamp || new Date().toISOString(),
          r.registrationRef || '',
          r.forumName || '',
          r.motto || '',
          r.yearEstablished || '',
          r.areaOfCoverage || '',
          r.lga || '',
          r.ward || '',
          r.officeAddress || '',
          r.coordinatorName || '',
          r.coordinatorPhone || '',
          r.secretaryName || '',
          r.secretaryPhone || '',
          r.forumEmail || '',
          r.memberStrength || '',
          r.capacityRange || '',
          r.previousElections || '',
          r.status || 'APPROVED_VERIFIED'
        ]);
      }
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', count: rows.length }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'ignored', message: 'No action taken' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
