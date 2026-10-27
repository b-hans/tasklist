function editTaskForm (params) {

    const e = params.e;
    const display = params.display;
    const eRange = e.range;
    const eRow = eRange.getRow();
    const eValue = eRange.getValue();
    const a1 = eRange.getA1Notation();

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

        display.setValue ("In edit task: " + myTaskData.task_name + 
            " : " + myTaskData.assignee + "\n" +
            "Latest: " + latest[headers.indexOf('due_date')].toLocaleDateString('en-US') +
            " : "
        );

        if (latest[headers.indexOf('completed')]) {
            display.setValue (display.getValue() + "closed");
        }
        else {
            display.setValue (display.getValue() + "open");
        }

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting the edit view: " + error);

        return false;
    }
}