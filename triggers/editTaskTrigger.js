function editTaskTrigger(params) {

    const e = params.e;
    const eRange = e.range;
    const eValue = eRange.getValue();
    const a1 = eRange.getA1Notation();

    const displayCache = getDisplayCache();
    const display = displayCache.display;
    const TASK_DATA = displayCache.TASK_DATA

    try {

        // check a1 first
        switch (a1) {

            case FORM_ACTIONS_DD:
                switch (eValue) {
                    case "Return":
                        return startTasks();

                    case "Edit":
                        FORMSHEET.getRange(FORM_ACTIONS_DD).setValue ("Actions");
                        if (!validateTaskEdit({display: display, TASK_DATA: TASK_DATA})) {
                            return false;
                        }
                        else {

                            display.setValue ("Now get a confirmation");
                            return true;
                            // return editTask ({display: display, TASK_DATA: TASK_DATA});
                        }

                    default:
                        if (!isValueInDropdown({display: display, rangeA1: a1})) {
                            display.setFontColor('red').setValue("Invalid");
                        }
                        else {
                            display.setValue(eValue);
                        }
                        FORMSHEET.getRange(FORM_ACTIONS_DD).setValue("Actions");
                        return true;
                }

                case CTN_IN:
                    if (!eValue.trim()) {
                        display.setFontColor('red')
                            .setValue ("Task name cannot be empty");
                        eRange.setValue(e.oldValue);
                    }
                    else {
                        display.setValue("Ready");
                    }

                    return true;

                case CRP_IN:
                case CAS_IN:
                    if (!isValueInDropdown({display: display, rangeA1: a1})) {
                        display.setFontColor('red').setValue("Invalid");
                        eRange.setValue(e.oldValue);
                    }
                    else {
                        display.setValue("Ready");
                    }
                    return true;

                case CDD_IN:

                    if (!isValidDate({display: display, d: eValue})) {
                        display.setFontColor('red').setValue ("Invalid date");
                        eRange.setValue(e.oldValue);
                    }
                    else {
                        display.setValue("Ready");
                    }

                    return true;
            

            default:
                display.setFontColor('red').setValue("Invalid");
                eRange.setValue(e.oldValue);
                FORMSHEET.getRange(FORM_ACTIONS_DD).activate();
                return false;
        }

        display.setValue ("In trigger");
        
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error in edit task trigger: " + error);

        return false;
    }

}