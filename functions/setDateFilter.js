function setDateFilter (params) {

    const display = params.display;
    const e = params.e;
    const eRange = e.range;
    const rangeA1 = eRange.getA1Notation();
    const eValue = eRange.getValue();

    const TASK_DATA = getCache();

    try {

        if (!isValueInDropdown({display: display, rangeA1: rangeA1})) {
            display.setFontColor('red').setValue("Invalid").activate();
            eRange.setValue(e.oldValue);
            return true;
        }

        // filter the data

        TASK_DATA.date_filter = eValue;

        if (!setCache({display: display, data: TASK_DATA})) {
            return false;
        }

        display.setValue ("Ready!");
        return true;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error setting date filter: " + error);
        return false;
    }
}