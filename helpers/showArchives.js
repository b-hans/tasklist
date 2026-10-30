function showArchives (params) {

    const display = params.display;
    const TASK_DATA = params.TASK_DATA;

    try {

        TASK_DATA.status = "archives";
        setCache({
            display:    display,
            data:       TASK_DATA
        });

        clearTaskRange({display: display});

        // clear other ranges
        FORMSHEET.getRange("D8:G8").clear()
            .setBackground(FORM_BACKGROUND)
            .clearDataValidations();
        FORMSHEET.getRange("B10:G10").clear()
            .setBackground(FORM_BACKGROUND);

        const actionRange = FORMSHEET.getRange(FORM_ACTIONS_DD);

        actionRange.setDataValidation(ARCHIVE_ACTION_RULE)
            .setValue("Actions").activate();

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

        FORMSHEET.getRange(ARCHIVE_DDT_RANGE)
            .setHorizontalAlignment('right')
            .setValue("Archives: ");

        let archiveDD = FORMSHEET.getRange(ARCHIVE_DD_RANGE).merge();
        setActionStyles({display: display, range: archiveDD});

        const newRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(matchedNames, true)
            .setAllowInvalid(true)
            .build();

        archiveDD.setDataValidation(newRule)
            .setValue("Select archive")
            .activate();

        display.setValue ("Ready");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error showing archives: " + error);
        return false;
    }
}