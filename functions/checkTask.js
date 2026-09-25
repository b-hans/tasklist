function checkTask (params) {

    const display = params.display;
    const e = params.e;
    const eRange = e.range;
    const eValue = eRange.getValue();
    const eRow = eRange.getRow();

    try {

        let data = FORMSHEET.getRange(
            eRow, 2, 1, 6
        ).getValues()[0];

        let taskObject = {
            task_name:  data[0],
            due_date:   data[2],
            assignee:   data[4],
            completed:  data[5],
        }

        let task = getTask({display: display, taskObject: taskObject});
        if (!task) {
            return false;
        }

        // update row in sheet

        task.completed = true;

        if (!updateTask({task: task, display: display})) {
            return false;
        }

        // if repeat get next task

        // add next task to sheet

        // rebuild tasks

        display.setValue("");
        return true;
    }
    catch (error){
        display.setValue ("Error in checking task: " + error)
            .setFontColor('red');
        return false;
    }
}