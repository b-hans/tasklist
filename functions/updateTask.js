function updateTask (params) {

    const display = params.display;
    const task = params.task;

    try {

        let row = [
            task.task_id,
            task.task_name,
            task.due_date,
            task.repeat_type,
            task.completed,
            task.assignee,
        ];

        let sheet = SpreadsheetApp.openById(DATASHEET_ID)
            .getSheetByName("Tasks");

        let idsFlat = sheet.getRange(1, 1, sheet.getLastRow(), 1)
            .getValues().flat();

        let myRow = idsFlat.indexOf(task.task_id) + 1;

        sheet.getRange(myRow, 1, 1, row.length)
            .setValues([row]);

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error updating task: " + error);
        return false;
    }
}