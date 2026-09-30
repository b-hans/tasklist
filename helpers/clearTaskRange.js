function clearTaskRange (params) {

    const display = params.display;

    try {

        let range = FORMSHEET.getRange(
            TASK_START_ROW, 
            2,
            28-TASK_START_ROW+1,
            6
        ).clear()
        .removeCheckboxes()
        .setBackground(FORM_BACKGROUND);

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error clearing task range: " + error);
        return false;
    }
}