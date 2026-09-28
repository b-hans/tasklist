function updateTask (params) {

    const display = params.display;
    const task = params.task;

    try {

        const currentTask = new Task(task.task_id);

        if (!currentTask.update()) {
            return false;
        }

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error updating task: " + error);
        return false;
    }
}