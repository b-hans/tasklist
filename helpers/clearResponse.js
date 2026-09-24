function clearResponse () {

    const data_display = getDisplayCache();
    const TASK_DATA = data_display.TASK_DATA;
    let display = data_display.display;

    try {

        TASK_DATA.in_response = false;
        TASK_DATA.response_message = "";

        setCache({display: display, data: TASK_DATA});

        display.setFontColor('black')
            .setHorizontalAlignment('left')
            .setValue("Ready!");

        FORMSHEET.getRange(RESPONSE_DD).clearDataValidations()
            .clear()
            .setBackground(FORM_BACKGROUND);

        FORMSHEET.getRange(FORM_ACTIONS_DD).activate();

        return true;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error clearing response: " + error);
        return false;
    }
}