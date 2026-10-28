function isDuplicate (params) {

    const display = params.display;
    const newTask = params.newTask;

    try {

        console.log (newTask);

        const testTask = new Taskdata ({
            task_name:  newTask.task_name, 
            assignee:   newTask.assignee
        });

        const latest = testTask.latest();

        if (!latest) {
            return false;
        }

        if (latest[testTask.headers.indexOf('completed')]) {
            return false;
        }

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue('Error checking for duplicate: ' + error);
        return false;
    }
}