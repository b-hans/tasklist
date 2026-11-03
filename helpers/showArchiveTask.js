function showArchiveTask (archiveTask) {

    const display = archiveTask.display;
    const archiveName = archiveTask.archiveName;
    const taskName = archiveTask.taskName;
    const assignee = archiveTask.assignee;

    try {

        const sheet = SpreadsheetApp.openById(DATASHEET_ID)
            .getSheetByName(archiveName);

        const data = sheet.getDataRange().getValues();
        const headers = data.shift();

        const filteredArray = data.filter(row => {

            if (row[headers.indexOf('task_name')] == taskName &&
                row[headers.indexOf('assignee')] == assignee) {
                    return true;
                }

            return false;

        });

        filteredArray.sort ((a, b) => new Date(b[headers.indexOf('date_completed')]) -
            new Date(a[headers.indexOf('date_completed')]));

        clearTaskRange({display: display});

        FORMSHEET.getRange("E8:G8")
            .clear()
            .setBackground(FORM_BACKGROUND)
            .clearDataValidations();

        FORMSHEET.getRange(DUE_DATE).setValue("Assignee");

        let datesTitle = FORMSHEET.getRange("F10:G10").merge()
            .setValue("Completed dates");


        // render the data

        // merge column 2 3 for the range
        let taskNameRange = FORMSHEET.getRange (
            TASK_START_ROW,
            FORM_TASK_NAME_COL,
            filteredArray.length,
            2
        ).mergeAcross();

        // merge column 4 5 for the range
        let taskAssigneeRange = FORMSHEET.getRange (
            TASK_START_ROW,
            4,
            filteredArray.length,
            2
        ).mergeAcross();

        // merge column 4 5 for the range
        let taskCompletedRange = FORMSHEET.getRange (
            TASK_START_ROW,
            6,
            filteredArray.length,
            2
        ).mergeAcross();

        let curRow = TASK_START_ROW;
        let color1 = 'white';
        let color2 = '#f7f5d2';

        for (let i=0; i<filteredArray.length; i++) {
            let bcolor;
            if (i % 2 === 0) {
                bcolor = color2;
            }
            else {
                bcolor = color1;
            }

            let range = FORMSHEET.getRange(curRow, 2, 1, 6)
                .setHorizontalAlignment('left')
                .setBackground(bcolor);

            range = FORMSHEET.getRange(curRow++, 6, 1, 2)
                .setHorizontalAlignment('right')


        }

        const mappedArray = filteredArray.map (row => {

            return [
                row[headers.indexOf('task_name')],
                "",
                row[headers.indexOf('assignee')], 
                "",
                new Date(row[headers.indexOf('date_completed')]).toLocaleDateString('en-US'),
                ""
            ]
        });

        let newDataRange = FORMSHEET.getRange(
            TASK_START_ROW,
            2,
            mappedArray.length,
            6
        ).setValues(mappedArray);

        console.log (mappedArray);

        display.setValue ("Get new cache values and dropdown");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error showing archive details: " + error);
        return false;
    }
}