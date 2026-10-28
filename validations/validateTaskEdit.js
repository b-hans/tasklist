function validateTaskEdit (params) {

    const display = params.display;
    const TASK_DATA = params.TASK_DATA;

    try {

        const inputDate = FORMSHEET.getRange(CDD_IN).getValue();

        if (!inputDate) {
            display.setFontColor('red').setValue ("Due date is required");
            return false;
        }

        // get form data
        const inputData = {
            task_name:  FORMSHEET.getRange(CTN_IN).getValue().trim(),
            due_date:   new Date (FORMSHEET.getRange(CDD_IN).getValue()),
            repeat:     FORMSHEET.getRange(CRP_IN).getValue(),
            assignee:   FORMSHEET.getRange(CAS_IN).getValue()
        };

        // check to see if the date has been changed

        // let's get information on latest task
        const task = new Taskdata({
            task_name:  TASK_DATA.task_name,
            assignee:   TASK_DATA.assignee
        });

        const latest = task.latest();

        let hasChanged = false;

        if (inputData.due_date.toLocaleDateString('en-US') != 
            latest[task.headers.indexOf('due_date')].toLocaleDateString('en-US')) {
                hasChanged = true;
            }

        if (latest[task.headers.indexOf('completed')]) {
            display.setFontColor('red')
                .setValue("Completed tasks cannot be edited");
            return false;
        }

        if (inputData.task_name != task.task_name || 
            inputData.assignee != task.assignee
        ) {
            // check for a duplicate open task
            if (isDuplicate({display: display, newTask: inputData})) {
                display.setFontColor('red')
                    .setValue ("That task exists");
                return false;
            }

            hasChanged = true;
        }
            

        if (inputData.repeat != latest[task.headers.indexOf('repeat_type')]) {
            hasChanged = true;
        }

        if (inputData.assignee != task.assignee) {
            hasChanged = true;
        }

        console.log (inputData);
        console.log (latest);
        console.log (task);

        if (!hasChanged) {
            display.setFontColor('red').setValue ("Nothing has been changed");
            return false;
        }

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error validating edit: " + error);
        return false;
    }
}