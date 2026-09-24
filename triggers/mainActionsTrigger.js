function mainActionsTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();
    const A1 = eRange.getA1Notation();

    const data_display = getDisplayCache()
    const TASK_DATA = data_display.TASK_DATA;
    let display = data_display.display;

    try {

        display.setFontColor('black').setValue ("Working....");

        eRange.setValue ("Actions");

        switch (eValue) {

            case "Create new task":
                return createNewTaskForm();

            case "Actions":
                break;

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
            .setValue ("Error in actions trigger: " + error);
        return false;
    }
}