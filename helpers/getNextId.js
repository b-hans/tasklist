function getNextId (params) {

    const display = params.display;
    const type = params.type;

    const idCol = 1;
    const data_sheet = SpreadsheetApp.openById(DATASHEET_ID);
    let sheet;

    try {
        if (type == "tasks") {
            sheet = data_sheet.getSheetByName('Tasks');
        }

        let numRows = sheet.getLastRow() - 1;

        if (numRows == 0) {
            return 1;
        }

        let data = sheet.getRange (2, idCol, numRows, 1)
            .getValues()[0].flat();

        console.log (data);

        return Math.max(...data) + 1;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting next id: " + error);
        return false;
    }

}