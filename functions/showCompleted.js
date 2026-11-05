function showCompleted () {

    const displayCache = getDisplayCache();
    const display = displayCache.display;
    const TASK_DATA = displayCache.TASK_DATA;

    try {

        console.log (TASK_DATA);

        // get the completed tasks
        const ss = SpreadsheetApp.openById(DATASHEET_ID);
        const sheet = ss.getSheetByName("Tasks");

        const data = sheet.getDataRange().getValues();
        const headers = data.shift();

        const filteredData = data.filter (row => {
            const completed = row[headers.indexOf('completed')];
            const assignee = row[headers.indexOf('assignee')];
            // const date_completed = new Date(row[headers.indexOf("date_completed")])
            if (completed == true || completed == "true" || completed == "TRUE"){
                return true;
                // if (TASK_DATA.assignee_filter != "All") {
                //     if (assignee == TASK_DATA.assignee) {
                //         return true;
                //     }
                // }
            }

            return false;
        });

        filteredData.sort ((a, b) => new Date(b[headers.indexOf('date_completed')]) -
            new Date(a[headers.indexOf('date_completed')]));

        console.log (filteredData);

        // set up the form

        clearTaskRange({display: display});
        FORMSHEET.getRange("B10:G10").clear()
            .setBackgroundColor(FORM_BACKGROUND);

        /**
         * merge B10:C10
         * header styles
         * Completed task
         */

        let hRange = FORMSHEET.getRange("B10:C10").merge();
        applyHeaderStyle(hRange);
        hRange.setValue("Completed task");

        /**
         * D10
         * header styles
         * Completed
         */
        hRange = FORMSHEET.getRange("D10");
        applyHeaderStyle(hRange);
        hRange.setValue("Completed");

        /**
         * E10
         * header styles
         * Assignee
         */
        hRange = FORMSHEET.getRange("E10");
        applyHeaderStyle(hRange);
        hRange.setValue("Assignee");

        /**
         * merge F10:G10
         * header styles
         * Mark as open
         */
        hRange = FORMSHEET.getRange("F10:G10").merge();
        applyHeaderStyle(hRange);
        hRange.setValue("Mark as open");


        display.setValue ("getting completed");
        return true;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting completed tasks: " + error);
        return false;
    }
}