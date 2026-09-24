function mainTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const data_display = getDisplayCache();
    const TASK_DATA = data_display.TASK_DATA;
    let display = data_display.display;

    try {

        if (e.range.getSheet().getName() != "Forms") {
            return true;
        }

        display.setFontColor('black').setValue ("Working....");

        if (A1 == "A1") {
            if (eValue.toLowerCase() == "clear") {
                return clearSheet();
            }
            else if (eValue.toLowerCase() == "start") {
                return startTasks();
            }
            else {
                eRange.setValue (e.oldValue);
                display.setFontColor('red')
                    .setValue ("Invalid")
                    .activate();
                return true;
            }

        }

        if (TASK_DATA.in_response) {
            return responseTrigger(e);
        }

        if (TASK_DATA.status == "create_task") {
            return createTaskTrigger(e);
        }

        switch (A1) {

            case FORM_ACTIONS_DD:
                return mainActionsTrigger(e);

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