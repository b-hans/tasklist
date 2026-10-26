function editTaskForm (params) {

    const e = params.e;
    const display = params.display;
    const eRange = e.range;
    const eRow = eRange.getRow();
    const eValue = eRange.getValue();
    const a1 = eRange.getA1Notation();

    try {

        // get name of task
        const taskName = FORMSHEET.getRange(eRow, 2).getValue();

        // get assignee of task
        const taskAssignee = FORMSHEET.getRange(eRow, 6).getValue();

        clearTaskRange({display: display});
        FORMSHEET.getRange(CLEAR_RANGE)
            .clear()
            .removeCheckboxes()
            .setBackground(FORM_BACKGROUND);

        // clear filters
        FORMSHEET.getRange(FORM_FILTERS_RANGE).clear()
            .clearDataValidations()
            .setBackground(FORM_BACKGROUND);


        display.setValue ("In edit task: " + taskName + " : " + taskAssignee);
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting the edit view: " + error);

        return false;
    }
}