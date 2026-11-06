function completedTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const displayCache = getDisplayCache();
    const display = displayCache.display;
    const TASK_DATA = displayCache.TASK_DATA;

    try {

        const validation = eRange.getDataValidation();

        // if checked first
        if (validation !== null &&
            validation.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX ) {
                display.setValue ("Do the check");
                return true;
            }

        switch (A1) {

            case FORM_ACTIONS_DD:
                if (eValue == "Actions") {
                    display.setValue ("Ready!");
                    return true;
                }
                else if (eValue == "Return to main menu") {
                    return startTasks();
                }
                else {
                    display.setFontColor('red').setValue ("Invalid");
                    eRange.setValue(e.oldValue).activate();
                    return true;
                }

            case FORM_DATE_RANGE:
            case FORM_ASSIGNEE_RANGE:
                display.setValue ("Refilter");
                return true;

            default:
                display.setFontColor('red').setValue('Invalid');
                eRange.setValue(e.oldValue);
                FORMSHEET.getRange(FORM_ACTIONS_DD).activate();
                return true;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue('Error in completed trigger: ' + error);
        return false;
    }
}