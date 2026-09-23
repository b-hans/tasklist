function createNewTaskForm () {

    const TASK_DATA = getCache();
    let display = FORMSHEET.getRange("A1");

    try {

        if (TASK_DATA.display) {
            display = FORMSHEET.getRange(TASK_DATA.display);
        }

        TASK_DATA.status = "create_task";

        setCache({display: display, data: TASK_DATA});

        FORMSHEET.getRange(CLEAR_RANGE)
            .clear()
            .setBackground("#e3eaf5");

        // Task name

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

        FORMSHEET.getRange(CTN_INPUT).merge().setBackground('white');
        FORMSHEET.getRange(CDD_INPUT).merge().setBackground(LIGHT_GRAY);
        FORMSHEET.getRange(CRP_INPUT).merge().setBackground('white');
        FORMSHEET.getRange(CAS_INPUT).merge().setBackground(LIGHT_GRAY);

        let inRange = FORMSHEET.getRange(CREATE_INPUT_RANGE)
            .setBorder(
                true, true, true, true, false, false,
                TITLE_BORDER_COLOR,
                SpreadsheetApp.BorderStyle.DOUBLE
            );

        // change actions

        FORMSHEET.getRange(FORM_ACTIONS_DD)
            .setDataValidation(FORM_CREATE_ACTIONS_RULE);

        display.setValue ("Get new form data");

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting new task form: " + error);
        return false;
    }

}