function verifyTask (params) {

    const display = params.display;

    try {

        let myData = assignTask(params);
        let sheetData = getTaskData();

        let messages = [];

        // check for task exists
        if (sheetData.tasks.some(task => {
            const strValue = String(task.completed).trim().toLowerCase();

            if (task.task_name.toLowerCase().trim() == myData.name.toLowerCase().trim() &&
                task.assignee == myData.assignee &&
                (!task.completed || strValue === "false" || strValue === "")) {
                    return true;
                }
            else {
                return false;
            }

        })) {
            messages.push ("Task exists");
        }
        else if (!myData.name) {
            messages.push ("Task name is required");
        }

        if (!myData.due_date) {
            messages.push ("Due date is required");
        }

        if (!myData.repeat || myData.repeat == "Select one") {
            messages.push ("Repeat type is required")
        }

        if (!myData.assignee || myData.assignee == "Select one") {
            messages.push ("Assignee required");
        }

        if (messages.length <= 0) {
            return true;
        }

        let outMessage = "Correct errors: ";

        for (let i=0; i<messages.length; i++) {
            outMessage += '"' + messages[i] + '" ';
        }

        display.setValue (outMessage).setFontColor('red');
        
        return false;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error verifying task: " + error);
        return false;
    }
}