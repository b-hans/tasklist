function clearSheet () {
    
    const display = FORMSHEET.getRange("A1");

    try {

        FORMSHEET.getRange(1, 1, FORMSHEET.getMaxRows(), FORMSHEET.getMaxColumns())
            .clear();

        FORMSHEET.getRange("A1:H31").clearDataValidations();

        FORMSHEET.setRowHeights(1, FORMSHEET.getMaxRows(), 21);
        FORMSHEET.setColumnWidths(1, FORMSHEET.getMaxColumns(), 100);


        if (!setCache({display: display, data: {}})) {
            return false;
        }

        display.setValue ("");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue('Error clearing sheet: ' + error);
        return false;
    }
}