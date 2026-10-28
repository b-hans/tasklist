function mainTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const data_display = getDisplayCache();
    const TASK_DATA = data_display.TASK_DATA;
    let display = data_display.display;

    try {

        // Not in the forms sheet, return
        if (e.range.getSheet().getName() != "Forms") {
            return true;
        }

        display.setFontColor('black').setValue ("Working....");

        // a1 range - options "clear" "start" "run"
        if (A1 == "A1") {
            if (eValue.toLowerCase() == "clear") {
                return clearSheet();
            }
            else if (eValue.toLowerCase() == "start") {
                return startTasks();
            }
            else if (eValue.toLowerCase().trim() == "run") {
                return runTests();
            }
            else {
                eRange.setValue (e.oldValue);
                display.setFontColor('red')
                    .setValue ("Invalid")
                    .activate();
                return true;
            }

        }

        // if we're missing the status, lets restart
        if (!TASK_DATA.status) {
            return startTasks()
        }

        // wating for a response
        if (TASK_DATA.in_response) {
            return responseTrigger(e);
        }

        // status is create task
        if (TASK_DATA.status == "create_task") {
            return createTaskTrigger(e);
        }

        if (TASK_DATA.status == "edit_task") {
            return editTaskTrigger({e: e});
        }

        // look for checkboxes - either check the task as complete, or edit if in edit
        if (FORMSHEET.getLastRow() >= TASK_START_ROW) {

            let numRows = FORMSHEET.getLastRow() - TASK_START_ROW + 1;

            // checkbox range
            let checkRange = FORMSHEET.getRange(
                TASK_START_ROW,
                TASK_CHECK_COLUMN,
                numRows,
                1,
            );

            let row = eRange.getRow();
            let col = eRange.getColumn();

            if (row >= TASK_START_ROW && row <= FORMSHEET.getLastRow() &&
                col == TASK_CHECK_COLUMN) {
                    if (TASK_DATA.view_type == "edit") {
                        return editTaskForm({e: e, display: display});
                    }

                    return checkTask({display: display, e: e});
                }


        }

        // from action dropdown
        switch (A1) {

            case FORM_ACTIONS_DD:
                return mainActionsTrigger(e);

            case FORM_DATE_RANGE:
            case FORM_ASSIGNEE_RANGE:
                return setFilter({e: e});

            default:
                eRange.setValue (e.oldValue);
                display.setFontColor('red')
                    .setValue ("Invalid")
                    .activate();
                return true;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error in trigger: " + error);
        return false;
    }
}