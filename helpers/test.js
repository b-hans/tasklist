function test() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName('Forms');

    sheet.getRange("A1").setValue ('My test');

    return true;
}