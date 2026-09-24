function enterTask (params) {

    const display = params.display;

    try {

        let myData = assignTask({display: display});
        let task_id = getNextId({display: display, type: "tasks"});

        let row = [
            task_id,
            myData.name,
            myData.due_date,
            myData.repeat,
            false,
            myData.assignee
        ];

        const data_sheet = SpreadsheetApp.openById(DATASHEET_ID);
        const sheet = data_sheet.getSheetByName('Tasks');

        sheet.appendRow(row);


        display.setValue ("Entering....");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error entering the task: " + error);
        return false;
    }
}