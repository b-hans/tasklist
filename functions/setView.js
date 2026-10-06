function setView (params) {

    const data_display = params.data_display;
    const display = data_display.display;

    const type = params.type;
    let TASK_DATA = data_display.TASK_DATA;

    try {

        let actionRange = FORMSHEET.getRange(FORM_ACTIONS_DD);

        if (type == "completed") {
            FORMSHEET.getRange(CURRENT_TASK).setValue ("Completed tasks");
            actionRange.setDataValidation(FORM_COMPLETE_ACTIONS_RULE)
                .setValue('Actions');

            TASK_DATA.view_type = "completed"

        }
        else {
            FORMSHEET.getRange(CURRENT_TASK).setValue ("Current tasks");
            actionRange.setDataValidation(FORM_ACTIONS_RULE)
                .setValue('Actions');

            TASK_DATA.view_type = "open"

        }

        if (!setCache({display: display, data: TASK_DATA})) {
            return false;
        }

        if (!populateTasks()) {
            return false;
        }

        display.setValue ("Ready!");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error setting view: " + error);
        return false;
    }

}