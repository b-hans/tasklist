function clearSheet () {
    
    const display = FORMSHEET.getRange("A1");

    try {

        FORMSHEET.getRange(1, 1, FORMSHEET.getMaxRows(), FORMSHEET.getMaxColumns())
            .clear();

        FORMSHEET.getDataRange().clearDataValidations();


        if (!setCache({display: display, data: {}})) {
            return false;
        }

        display.setValue ("Clearing sheet");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue('Error clearing sheet: ' + error);
        return false;
    }
}