function setDateFilter (params) {

    const e = params.e;
    const eRange = e.range;
    const rangeA1 = eRange.getA1Notation();
    const eValue = eRange.getValue();

    const display_data = getDisplayCache();

    const TASK_DATA = display_data.TASK_DATA;
    const display = display_data.display;

    try {

        if (!isValueInDropdown({display: display, rangeA1: rangeA1})) {
            display.setFontColor('red').setValue("Invalid").activate();
            eRange.setValue(e.oldValue);
            return true;
        }

        TASK_DATA.date_filter = eValue;
     
        if (!setCache({display: display, data: TASK_DATA})) {
            return false;
        }

        return populateTasks();

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error setting date filter: " + error);
        return false;
    }
}