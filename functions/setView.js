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
        else if (type == "edit") {
            // by name
            // set the value of the tasks column to "All tasks"

            FORMSHEET.getRange(CURRENT_TASK).setValue ("All tasks");
            FORMSHEET.getRange(DUE_DATE_A1).setValue("Most Recent");
            FORMSHEET.getRange(COMPLETED).setValue("Edit");
            
            // get a new data validation for actionRange
            actionRange.setDataValidation(EDIT_ACTIONS_RULE)
                .setValue('Actions');

            // set a new TASK_DATA.view_type
            TASK_DATA.view_type = "edit";

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

        if (TASK_DATA.view_type == "edit") {
            if (!populateEdit()){
                return false;
            }
        }
        else if (!populateTasks()) {
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