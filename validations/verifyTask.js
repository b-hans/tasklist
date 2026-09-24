function verifyTask (params) {

    const display = params.display;

    try {

        let myData = assignTask(params);
        let sheetData = getTaskData();

        console.log (myData);
        console.log (sheetData);

        let messages = [];

        // check for task exists
        if (sheetData.tasks.some(task => {
            task.task_name == myData.name &&
            task.assignee == myData.assignee &&
            (!task.completed || task.completed == false)

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