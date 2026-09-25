function updateTask (params) {

    const display = params.display;
    const task = params.task;

    try {

        console.log (task);

        display.setValue ("In update task");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error updating task: " + error);
        return false;
    }
}