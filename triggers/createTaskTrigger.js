function createTaskTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const TASK_DATA = getCache();

    try {

        let display = FORMSHEET.getRange("A1");
        if (TASK_DATA.display) {
            display = FORMSHEET.getRange(TASK_DATA.display);
        }

        /**
         *  valid values are
         *  B8 FORM_ACTIONS_DD
         *  D11 CTN_IN
         *  CDD_IN
         *  CRP_IN
         *  CAS_IN
         */

        switch (A1) {

            case FORM_ACTIONS_DD:
                if (eValue == "Actions") {
                    display.setValue("Ready!");
                    return true;
                }

                FORMSHEET.getRange(A1).setValue("Actions");

                if (!isValueInDropdown({display: display, rangeA1: A1})) {
                    display.setFontColor('red').setValue("Invalid").activate();
                    eRange.setValue(e.oldValue);
                    return true;
                }

                if (eValue == "Cancel") {
                    return requestResponse({display: display, eValue});
                }

                FORMSHEET.getRange(FORM_ACTIONS_DD).setValue("Actions");
                return true;

            case CTN_IN:
            
                display.setValue ("Assign: " + eValue);
                return true;

            case CDD_IN:
                if (!isValidDate({display: display, d: eValue})) {
                    display.setValue("Not a valid date").setFontColor('red')
                        .activate();

                    eRange.setValue(e.oldValue);
                    return true;
                }


                display.setValue("Ready!");
                return true;

            case CRP_IN:
            case CAS_IN:
                if (!isValueInDropdown({display: display, rangeA1: A1})) {
                    display.setFontColor('red')
                        .setValue('Invalid').activate();

                    eRange.setValue(e.oldValue)
                    return true;
                }

                display.setValue("Ready!");
                return true;

            default:
                display.setValue("Invalid").setFontColor('red')
                    .activate();
                eRange.setValue(e.oldValue);
                return true;
        }
        

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error in create task trigger: " + error);
        return false;
    }
}