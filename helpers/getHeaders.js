function getHeaders (params) {

    const display = params.display;

    try {

        let spreadsheet = SpreadsheetApp.openById(DATASHEET_ID);

        let tasks = spreadsheet.getSheetByName('Tasks');
        let tasksVals = tasks
            .getRange(1, 1, 1, tasks.getLastColumn())
            .getValues()[0];

        let assignees = spreadsheet.getSheetByName('Assignees');
        let assigneesVals = assignees.
            getRange(1, 1, 1, assignees.getLastColumn())
            .getValues()[0];

        let repeat = spreadsheet.getSheetByName('Repeat types');
        let repeatVals = repeat.getRange(1, 1, 1, repeat.getLastColumn())
            .getValues()[0];

        return {
            tasks:          tasksVals,
            assignees:      assigneesVals,
            repeat_types:   repeatVals
        }
    }
    catch (error) {
        display.setValue("Error getting headers: " + error)
            .setFontColor('red');
        return false;
    }
}