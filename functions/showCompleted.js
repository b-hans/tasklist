function showCompleted () {

    const displayCache = getDisplayCache();
    const display = displayCache.display;
    const TASK_DATA = displayCache.TASK_DATA;

    try {

        // get the completed tasks
        const ss = SpreadsheetApp.openById(DATASHEET_ID);
        const sheet = ss.getSheetByName("Tasks");

        const data = sheet.getDataRange().getValues();
        const headers = data.shift();

        const date_filter = TASK_DATA.date_filter;
        const assignee_filter = TASK_DATA.assignee_filter;

        let bRange = FORMSHEET.getRange (
            TASK_START_ROW - 1,
            2,
            FORMSHEET.getLastRow(),
            6
        );

        let existingBandings = bRange.getBandings();

        existingBandings.forEach(function(banding) {
            banding.remove();
        });

        clearTaskRange({display:display});

        const filteredData = data.filter (row => {
            const completed = row[headers.indexOf('completed')];
            const assignee = row[headers.indexOf('assignee')];
            const date_completed = new Date(row[headers.indexOf("date_completed")])
            if (completed == true || completed == "true" || completed == "TRUE"){

                if (TASK_DATA.assignee_filter != "All") {
                    if (assignee != TASK_DATA.assignee_filter) {
                        return false;
                    }
                }

                // apply the current filters
                switch (date_filter) {

                    case "This week":

                        const now = new Date();
                        
                        // 1. Calculate the start of the current week (Sunday at 00:00:00)
                        const startOfWeek = new Date(now);
                        startOfWeek.setDate(now.getDate() - now.getDay());
                        startOfWeek.setHours(0, 0, 0, 0);

                        // 2. Calculate the end of the current week (Saturday at 23:59:59)
                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 6);
                        endOfWeek.setHours(23, 59, 59, 999);

                        if (date_completed >= startOfWeek && completed <= endOfWeek) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        
                    case "Today":
                        const todayStr = new Date().toDateString();
                        const todComplete = date_completed.toDateString();

                        if (todComplete ===  todayStr) {
                            return true;
                        }
                        else {
                            return false;
                        }

                    case "This month":
                        const monthNow = new Date();

                        if ((date_completed.getFullYear() === monthNow.getFullYear() &&
                            date_completed.getMonth() === monthNow.getMonth())) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        

                    case "This quarter":

                        const mtoday = new Date();

                        // 1. Check if the years match
                        if (date_completed.getFullYear() !== 
                            mtoday.getFullYear()){
                                return false;
                            } 
                        
                        // 2. Calculate quarters: Math.ceil((month + 1) / 3)
                        const currentQuarter = Math.ceil((mtoday.getMonth() + 1) / 3);
                        const targetQuarter = Math.ceil((date_completed.getMonth() + 1) / 3);
                        
                        if (currentQuarter === targetQuarter) {
                            return true;
                        }
                        else {
                            return false;
                        }

                    case 'All':
                    case 'Past due':
                        return true;

                }

            }

            return false;
        });

        filteredData.sort ((a, b) => new Date(b[headers.indexOf('date_completed')]) -
            new Date(a[headers.indexOf('date_completed')]));

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

        const mappedArray = filteredData.map(row => {

            return [
                row[headers.indexOf('task_name')],
                "",
                new Date(row[headers.indexOf('date_completed')])
                    .toLocaleDateString('en-US'),
                row[headers.indexOf('assignee')],
                "",
                ""
            ];
        });

        if (mappedArray.length <= 0) {
            display.setValue ("Nothing to display");
            return true;
        }

        let workingRange = FORMSHEET.getRange (
            TASK_START_ROW,
            1,
            mappedArray.length + 1,
            8
        ).setBackgroundColor(FORM_BACKGROUND);

        // merge column 2 3 for the range
        workingRange = FORMSHEET.getRange (
            TASK_START_ROW,
            FORM_TASK_NAME_COL,
            mappedArray.length,
            2
        ).mergeAcross();

        // merge column 6 7
        workingRange = FORMSHEET.getRange (
            TASK_START_ROW,
            6,
            mappedArray.length,
            2
        ).mergeAcross();

        workingRange = FORMSHEET.getRange (
            TASK_START_ROW - 1,
            2,
            mappedArray.length + 1,
            6
        );

        zebraStripeCustomColors(workingRange);

        workingRange = FORMSHEET.getRange(
            TASK_START_ROW,
            4,
            mappedArray.length,
            1
        ).setHorizontalAlignment('right');

        workingRange = FORMSHEET.getRange(
            TASK_START_ROW,
            6,
            mappedArray.length,
            1,
        ).setHorizontalAlignment('center')
            .insertCheckboxes();


        workingRange = FORMSHEET.getRange (
            TASK_START_ROW,
            2,
            mappedArray.length,
            6
        ).setValues(mappedArray);

        workingRange = FORMSHEET.getRange(FORM_ACTIONS_DD)
            .setDataValidation(COMPLETED_RULE)
            .setValue('Actions')
            .activate();

        TASK_DATA.status = "completed";
        setCache({display: display, data: TASK_DATA});

        display.setValue ("Ready!");
        return true;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting completed tasks: " + error);
        return false;
    }
}