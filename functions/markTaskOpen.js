function markTaskOpen (params) {

    const display = params.display;
    const task = params.task;

    try {

        console.log (task);

        // get the task row
        const ss = SpreadsheetApp.openById(DATASHEET_ID);
        const sheet = ss.getSheetByName("Tasks");

        const data = sheet.getDataRange().getValues();
        const headers = data[0];

        const rowIndex = data.findIndex (row => {
            return row[headers.indexOf('task_name')] === task.task_name &&
                   row[headers.indexOf('assignee')] === task.assignee &&
                   new Date(row[headers.indexOf('date_completed')]).toLocaleDateString('en-US') ===
                   new Date (task.date_completed).toLocaleDateString('en-US')
        }); 
        
        if (rowIndex !== -1) {
            const sheetsRowNumber = rowIndex + 1;

            // get values of that row
            let values = data [rowIndex];

            // find any later tasks
            return true;


            values[headers.indexOf('completed')] = false;
            values[headers.indexOf('date_completed')] = "";

            const repRange = sheet.getRange (
                sheetsRowNumber,
                1,
                1,
                7
            ).setValues([values]);

            return showCompleted();

        }
        else {
            display.setValue ("Not found");
            return false;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error marking task open: " + error);
        return false;
    }
}