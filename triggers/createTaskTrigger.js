function createTaskTrigger (e) {

    const eRange = e.range;
    const eValue = eRange.getValue();

    const TASK_DATA = getCache();

    try {

        let display = FORMSHEET.getRange("A1");
        if (TASK_DATA.display) {
            display = FORMSHEET.getRange(TASK_DATA.display);
        }

        display.setValue ("In create task trigger: " + eValue);
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error in create task trigger: " + error);
        return false;
    }
}