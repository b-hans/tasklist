function editTask (params) {

    const display = params.display;
    const TASK_DATA = params.TASK_DATA;

    try {

        display.setValue ("Hey edit");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error editing the task: " + error);
        return false;
    }
}