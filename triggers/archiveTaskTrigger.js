function archiveTaskTrigger (params) {

    const e = params.e;
    const eRange = e.range;
    const eValue = eRange.getValue();
    const a1 = eRange.getA1Notation();

    const displayData = getDisplayCache();
    const display = displayData.display;
    const TASK_DATA = displayData.TASK_DATA;

    try {

        FORMSHEET.getRange(FORM_ACTIONS_DD).setValue("Actions");

        switch (a1) {

            case FORM_ACTIONS_DD:
                switch (eValue) {

                    case "Return":
                        return startTasks();

                    default:
                        if (!isValueInDropdown({display: display, rangeA1: a1})) {
                            eRange.setValue("Actions");
                            display.setFontColor('red').setValue('Invalid');
                            return true;
                        }

                        display.setValue("Ready");

                        return true;
                }

            case ARCHIVE_DD:
                FORMSHEET.getRange(ARCHIVE_DD).setValue("Select archive");
                display.setValue ("Check: " + eValue);
                return true;

            default:
                display.setFontColor('red').setValue('Invalid');
                eRange.setValue(e.oldValue);
                return true;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error in archive trigger: " + error);
        return false;
    }
}