function renderArchive (params) {

    const display = params.display;
    const TASK_DATA = params.TASK_DATA;
    const eValue = params.eValue;

    try {

        TASK_DATA.current_archive = eValue;
        setCache({display: display, data: TASK_DATA});

        const archive = new Archive({display: display, archive: eValue});

        if (!archive.valid) {
            return false;
        }

        if (!clearTaskRange({display: display})) {
            return false;
        }

        // set tasks headers
        // current tasks
        let tasks = FORMSHEET.getRange(CURRENT_TASK)
            .merge()
            .setValue ("Task name");

        if (!setHeaderStyles({display: display, range: tasks})) {
            return false;
        }

        // mostRecent
        let mostRecent = FORMSHEET.getRange(DUE_DATE)
            .merge()
            .setValue ("Most recent");

        if (!setHeaderStyles({display: display, range: mostRecent})) {
            return false;
        }

        let unMergeRange = FORMSHEET.getRange(ASSIGNEE + ":" + COMPLETED)
            .breakApart();

        // myAssignee
        let myAssignee = FORMSHEET.getRange(ASSIGNEE)
            .setValue ("Assignee");

        if (!setHeaderStyles({display: display, range: myAssignee})) {
            return false;
        }

        // showDetails
        let showDetails = FORMSHEET.getRange(COMPLETED)
            .setValue ("Show details");

        if (!setHeaderStyles({display: display, range: showDetails})) {
            return false;
        }

        // merge column 2 3 for the range
        let taskNameRange = FORMSHEET.getRange (
            TASK_START_ROW,
            FORM_TASK_NAME_COL,
            archive.displayArray.length,
            2
        ).mergeAcross();

        let mostRecentRange = FORMSHEET.getRange (
            TASK_START_ROW,
            FORM_DATE_COL,
            archive.displayArray.length,
            2
        ).mergeAcross();

        let curRow = TASK_START_ROW;
        let color1 = 'white';
        let color2 = '#f7f5d2';

        for (let i=0; i<archive.displayArray.length; i++) {
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

            range = FORMSHEET.getRange(curRow, 4, 1, 2)
                .setHorizontalAlignment('right')
                .setBackground(bcolor);

            range = FORMSHEET.getRange(curRow, 6, 1, 1)
                .setBackground(bcolor)
                .setHorizontalAlignment('center');

            range = FORMSHEET.getRange(curRow++, 7, 1, 1)
                .setBackground(bcolor)
                .setHorizontalAlignment('center')
                .insertCheckboxes();

        }

        let headers = archive.headers;
        let mappedArray = archive.displayArray.map (row => {
            return [
                row[headers.indexOf('task_name')],
                "",
                row[headers.indexOf('date_completed')],
                "",
                row[headers.indexOf('assignee')],
                ""
            ]
        });

        FORMSHEET.getRange(
            TASK_START_ROW,
            FORM_TASK_NAME_COL,
            archive.displayArray.length,
            6
        ).setValues(mappedArray);
     
        FORMSHEET.getRange(FORM_ACTIONS_DD)
            .setDataValidation(ARCHIVE_ACTION_RULE)
            .setValue('Actions')
            .activate();

        FORMSHEET.getRange(ARCHIVE_DDT_RANGE)
            .setHorizontalAlignment('right')
            .setValue("Archives: ");

        const matchedNames = getArchiveNames({display: display});

        let archiveDD = FORMSHEET.getRange(ARCHIVE_DD_RANGE).merge();
        setActionStyles({display: display, range: archiveDD});

        const newRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(matchedNames, true)
            .setAllowInvalid(true)
            .build();

        archiveDD.setDataValidation(newRule)
            .setValue(TASK_DATA.current_archive)
            .activate();

        display.setValue ("Ready!");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error rendering archive: " + error);
        return false;
    }
}