function actionDetailTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const displayCache = getDisplayCache();
    const display = displayCache.display;
    const TASK_DATA = displayCache.TASK_DATA;

    try {

        switch (A1) {

            case FORM_ACTIONS_DD:

                if (!isValueInDropdown({display: display, rangeA1: A1})) {
                    eRange.setValue("Actions");
                    display.setFontColor('red').setValue('Invalid');
                    return true;
                }

                switch (eValue) {
                    case "Actions":
                        display.setValue ("Ready!");
                        return true;

                    case "Return to archive":

                        TASK_DATA.status = "archives";
                        if (!setCache({display: display, data: TASK_DATA})) {
                            return false;
                        }

                        return renderArchive({
                            display:    display,
                            TASK_DATA:  TASK_DATA,
                            eValue:     TASK_DATA.current_archive
                        });

                    case "Leave archives":
                        return startTasks();
                }
                
            default:
                eRange.setValue(e.oldValue);
                display.setFontColor('red').setValue("Invalid");
                return true;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error in action detail trigger: " + error);
        return false;
    }

}