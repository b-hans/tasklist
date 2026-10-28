function editTaskForm (params) {

    const e = params.e;
    const display = params.display;
    const eRange = e.range;
    const eRow = eRange.getRow();
    const eValue = eRange.getValue();
    const a1 = eRange.getA1Notation();
    const TASK_DATA = getDisplayCache().TASK_DATA;

    try {

        // get name of task
        const taskName = FORMSHEET.getRange(eRow, FORM_TASK_NAME_COL)
            .getValue();

        // get assignee of task
        const taskAssignee = FORMSHEET.getRange(eRow, FORM_ASSIGNEE_COL)
            .getValue();

        const myTaskData = new Taskdata({task_name: taskName, assignee: taskAssignee});

        clearTaskRange({display: display});
        FORMSHEET.getRange(CLEAR_RANGE)
            .clear()
            .removeCheckboxes()
            .setBackground(FORM_BACKGROUND);

        // clear filters
        FORMSHEET.getRange(FORM_FILTERS_RANGE).clear()
            .clearDataValidations()
            .setBackground(FORM_BACKGROUND);

        const latest = myTaskData.latest();
        const headers = myTaskData.headers;

        // populate the form
       let tn = FORMSHEET.getRange(CREATE_TASK_NAME).setValue("Task name: ");
        if (!setCreateHeadingStyle({display: display, range: tn})) {
            return false;
        }

        // Due data
        let dd = FORMSHEET.getRange(CREATE_DUE_DATE).setValue("Due date: ");
        if (!setCreateHeadingStyle({display: display, range: dd})) {
            return false;
        }

        // Repeat
        let rp = FORMSHEET.getRange(CREATE_REPEAT).setValue("Repeat: ");
        if (!setCreateHeadingStyle({display: display, range: rp})) {
            return false;
        }

        // Assignee
        let aas = FORMSHEET.getRange(CREATE_ASSIGNEE).setValue("Assignee: ");
        if (!setCreateHeadingStyle({display: display, range: aas})) {
            return false;
        }


        let inRange = FORMSHEET.getRange(CREATE_INPUT_RANGE)
            .setBorder(
                true, true, true, true, false, false,
                TITLE_BORDER_COLOR,
                SpreadsheetApp.BorderStyle.DOUBLE
            );

        // change actions

        let taskData = getTaskData();

        if (!taskData) {
            return false;
        }

        FORMSHEET.getRange(CTN_INPUT).merge().setBackground('white')
            .setValue(myTaskData.task_name);

        // data picker
        let dateField = FORMSHEET.getRange(CDD_INPUT)
            .merge().setBackground(LIGHT_GRAY)
            .setDataValidation(DATE_PICKER_RULE)
            .setValue(
                latest[headers.indexOf('due_date')].toLocaleDateString('en-US')
            );

        // Repeat options
        let repeatOptionDD = FORMSHEET.getRange(CRP_INPUT).merge().setBackground('white');
        let rodd_list = taskData.repeatTypes.map(type => type.type);
        rodd_list.unshift("Select one");
        let rodd_rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(rodd_list, true)
            .setAllowInvalid(true)
            .build();

        repeatOptionDD.setDataValidation(rodd_rule)
            .setValue(latest[headers.indexOf('repeat_type')]);

        // Assignees
        let assigneeOptionDD = FORMSHEET.getRange(CAS_INPUT)
            .merge().setBackground(LIGHT_GRAY);

        let aodd_list = taskData.assignees.map (assi => assi.name);
        aodd_list.unshift("Select one");
        let aodd_rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(aodd_list, true)
            .setAllowInvalid(true)
            .build();

        assigneeOptionDD.setDataValidation(aodd_rule)
            .setValue(latest[headers.indexOf('assignee')]);

        if (latest[headers.indexOf('completed')]) {
            display.setValue ("Task is closed");
            TASK_DATA.date_status = "closed";
        }
        else {
            display.setValue ("Task is open");
            TASK_DATA.date_status = "open";
        }

        TASK_DATA.status = "edit_task";
        TASK_DATA.task_name = taskName;
        TASK_DATA.assignee = taskAssignee;
        setCache({display: display, data: TASK_DATA});

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting the edit view: " + error);

        return false;
    }
}