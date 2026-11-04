function getArchiveNames(params) {

    const display = params.display;

    try {

        // get the years
        const ss = SpreadsheetApp.openById(DATASHEET_ID);
        const sheets = ss.getSheets();

        const matchedNames = sheets
            .map (sheet => sheet.getName())
            .filter(name => name.includes("Archive: "));

        matchedNames.sort((a, b) => {
            if (a == b) {
                return 0;
            }
            else if (a > b) {
                return -1;
            }
            else {
                return 1;
            }
        });

        matchedNames.unshift("Select archive");

        return matchedNames;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting archive names: " + error);
        return false;
    }
}