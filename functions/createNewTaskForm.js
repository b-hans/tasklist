function createNewTaskForm () {

    const TASK_DATA = getCache();
    let display = FORMSHEET.getRange("A1");

    try {

        if (TASK_DATA.display) {
            display = FORMSHEET.getRange(TASK_DATA.display);
        }

        TASK_DATA.status = "create_task";


        FORMSHEET.getRange(CLEAR_RANGE)
            .clear()
            .setBackground(FORM_BACKGROUND);

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


        let inRange = FORMSHEET.getRange(CREATE_INPUT_RANGE)
            .setBorder(
                true, true, true, true, false, false,
                TITLE_BORDER_COLOR,
                SpreadsheetApp.BorderStyle.DOUBLE
            );

        // change actions

        FORMSHEET.getRange(FORM_ACTIONS_DD)
            .setDataValidation(FORM_CREATE_ACTIONS_RULE);

        let taskData = getTaskData({display: display});

        if (!taskData) {
            return false;
        }

        FORMSHEET.getRange(CTN_INPUT).merge().setBackground('white');

        // data picker
        let dateField = FORMSHEET.getRange(CDD_INPUT)
            .merge().setBackground(LIGHT_GRAY)
            .setDataValidation(DATE_PICKER_RULE);

        // Repeat options
        let repeatOptionDD = FORMSHEET.getRange(CRP_INPUT).merge().setBackground('white');
        let rodd_list = taskData.repeatTypes.map(type => type.type);
        rodd_list.unshift("Select one");
        let rodd_rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(rodd_list, true)
            .setAllowInvalid(true)
            .build();

        repeatOptionDD.setDataValidation(rodd_rule)
            .setValue("Select one");

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
            .setValue("Select one");

        TASK_DATA.sheetData = taskData;
        setCache({display: display, data: TASK_DATA});

        display.setValue ("Ready!");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting new task form: " + error);
        return false;
    }

}