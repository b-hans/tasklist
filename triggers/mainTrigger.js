function mainTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const TASK_DATA = getCache();

    const A1 = eRange.getA1Notation();

    try {

        if (e.range.getSheet().getName() != "Forms") {
            return true;
        }

        let display = FORMSHEET.getRange("A1");

        if (TASK_DATA.display) {
            display = FORMSHEET.getRange(TASK_DATA.display);
        } 

        display.setFontColor('black').setValue ("Working....");

        switch (A1) {

            case "A1":
                if (eValue.toLowerCase() == "clear") {
                    return clearSheet();
                }
                else if (eValue.toLowerCase() == "start") {
                    return startTasks();
                }
                else {
                    eRange.setValue (e.oldValue);
                    display.setFontColor('red')
                        .setValue ("Invalid")
                        .activate();
                    return true;
                }

            case FORM_ACTIONS_DD:
                return mainActionsTrigger(e);

            default:
                eRange.setValue (e.oldValue);
                display.setFontColor('red')
                    .setValue ("Invalid")
                    .activate();
                return true;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error in trigger: " + error);
        return false;
    }
}