function responseTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const data_display = getDisplayCache();
    const TASK_DATA = data_display.TASK_DATA;
    let display = data_display.display;

    try {
        
        if (A1 != RESPONSE_DD) {
            display.activate();
            eRange.setValue(e.oldValue);
            FORMSHEET.getRange(FORM_DISPLAY_RANGE).setFontColor('red')
                .setHorizontalAlignment('right')
                .setValue(TASK_DATA.response_message);
            return true;
        }

        FORMSHEET.getRange(RESPONSE_DD).setValue("Select one");

        if (TASK_DATA.status == "create_task") {
            switch (eValue) {

                case "Yes, cancel":
                    if (!startTasks()) {
                        return false;
                    }

                    display.setValue("Canceled!").setFontColor('black')
                        .setHorizontalAlignment('left');

                    return true;

                case "No, return":
                    return clearResponse();

                case "Yes, enter":
                    return enterTask();

                default:
                    display.setHorizontalAlignment('left')
                        .setFontColor('black')
                        .setValue ("Action: " + eValue);
                    return true;
            }
        }

        display.setHorizontalAlignment('left')
            .setFontColor('black')
            .setValue ("In response action: " + eValue);

        return true;
    }
    catch (error) {

        display.setFontColor('red')
            .setValue("Error in response trigger: " + error);
        return false;

    }
}