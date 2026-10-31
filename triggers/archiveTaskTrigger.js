function archiveTaskTrigger (params) {

    const e = params.e;
    const eRange = e.range;
    const eValue = eRange.getValue();
    const a1 = eRange.getA1Notation();

    const displayData = getDisplayCache();
    const display = displayData.display;
    const TASK_DATA = displayData.TASK_DATA;

    try {

        switch (a1) {

            case FORM_ACTIONS_DD:
                switch (eValue) {

                    case "Return":
                        return startTasks();

                    default:
                        if (!isValueInDropdown({display: display, rangeA1: a1})) {
                            eRange.setValue("Actions");
                            display.setFontColor('red').setValue('Invalid');
                            FORMSHEET.getRange(FORM_ACTIONS_DD).setValue("Actions")
                                .activate();
                            return true;
                        }
                        else {
                            display.setValue("Ready");
                            FORMSHEET.getRange(FORM_ACTIONS_DD).setValue("Actions")
                                .activate();
                            return true;
                        }

                }

            case ARCHIVE_DD:
                if (!isValueInDropdown({display: display, rangeA1: a1})) {
                    display.setFontColor('red').setValue('Invalid');
                    FORMSHEET.getRange(ARCHIVE_DD).setValue("Select archive")
                        .activate();
                    return true;
                }

                if (eValue == "Select archive") {
                    display.setValue ("Ready!");
                    return true;
                }

                return renderArchive({
                    display:    display,
                    TASK_DATA:  TASK_DATA,
                    eValue:     eValue
                });

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