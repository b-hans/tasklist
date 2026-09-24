function getTaskData () {

    const data_display = getDisplayCache();
    let display = data_display.display;
    const TASK_DATA = data_display.TASK_DATA;

    try {

        const data_sheet = SpreadsheetApp.openById(DATASHEET_ID);

        const taskDataSheet = data_sheet.getSheetByName('Tasks');

        const assigneesDataSheet  = data_sheet.getSheetByName('Assignees');

        const repeatTypesDataSheet = data_sheet.getSheetByName('Repeat types');

        let returnObject = {
            tasks:          getDataFromSheet(taskDataSheet),
            assignees:      getDataFromSheet(assigneesDataSheet),
            repeatTypes:    getDataFromSheet(repeatTypesDataSheet)
        }

        return returnObject;
    }
    catch (error) {
        display.setValue ("Error getting task data: " + error)
            .setFontColor('red');
        return false;
    }
}