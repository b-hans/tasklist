function archiveTaskTrigger (params) {

    const e = params.e;
    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const displayData = getDisplayCache();
    const display = displayData.display;
    const TASK_DATA = displayData.TASK_DATA;

    try {

        const rowNumber = eRange.getRow();
        let checkBoxRanges = getCheckBoxRanges({display: display});

        // we've submitted via checkbox
        if (checkBoxRanges.includes(A1)) {

            const archiveData = {
                archiveName:    FORMSHEET.getRange(ARCHIVE_DD).getValue(),
                taskName:       FORMSHEET.getRange(rowNumber, FORM_TASK_NAME_COL).getValue(),
                assignee:       FORMSHEET.getRange(rowNumber, FORM_ASSIGNEE_COL).getValue(),
                display:        display
            }

            return showArchiveTask(archiveData);

        }

        switch (A1) {

            // action dropdown
            case FORM_ACTIONS_DD:
                switch (eValue) {

                    case "Return":
                        return startTasks();

                    default:
                        if (!isValueInDropdown({display: display, rangeA1: A1})) {
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

            // archive dropdown
            case ARCHIVE_DD:
                if (!isValueInDropdown({display: display, rangeA1: A1})) {
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
                eRange.setValue(e.oldValue);
                display.setFontColor('red').setValue('Invalid');
                return true;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error in archive trigger: " + error);
        return false;
    }
}