function createNewTaskForm () {

    const TASK_DATA = getCache();
    let display = FORMSHEET.getRange("A1");

    try {

        if (TASK_DATA.display) {
            display = FORMSHEET.getRange(TASK_DATA.display);
        }

        TASK_DATA.status = "create_task";

        setCache({display: display, data: TASK_DATA});

        FORMSHEET.getRange(CLEAR_RANGE)
            .clear()
            .setBackground("#e3eaf5");

            

        display.setValue ("Get new form data");

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting new task form: " + error);
        return false;
    }

}