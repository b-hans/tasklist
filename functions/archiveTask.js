function archiveTask(params) {

    const display = params.display;
    const TASK_DATA = params.TASK_DATA;
    const type = params.type;

    try {

        const task = new Taskdata ({
            task_name:  TASK_DATA.task_name, 
            assignee:   TASK_DATA.assignee
        });

        if (!task.archive({type: type})) {
            return false;
        }

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error archiving task: " + error);
        return false;
    }
}