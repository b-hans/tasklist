function clearTaskRange (params) {

    const display = params.display;

    try {

        let lastRow = FORMSHEET.getLastRow();
        let numRows = lastRow-TASK_START_ROW+1;

        if (numRows < 1) {
            return true;
        }

        let range = FORMSHEET.getRange(
            TASK_START_ROW, 
            2,
            lastRow-TASK_START_ROW+1,
            6
        ).clear()
        .removeCheckboxes()
        .setBackground(FORM_BACKGROUND);

        if (lastRow > 28) {
            FORMSHEET.getRange(
                29,
                2,
                lastRow-29+1,
                6
            ).setBackground('white');
        }

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error clearing task range: " + error);
        return false;
    }
}