function getTask (params) {

    const taskObject = params.taskObject;
    const display = params.display;

    try {

        let allData = getTaskData();

        let taskData = allData.tasks.filter (

            task => {

                const strValue = String(task.completed).trim().toLowerCase();
                if (task.task_name == taskObject.task_name &&
                    (!task.completed || strValue === "false" || strValue === "")) {
                        return true;
                    }

                return false;
            }

        );

        if (taskData.length == 1) {
            return taskData[0];
        }
        else {
            return [];
        }

    }
    catch (e) {
        display.setFontColor('red')
            .setValue ("Error getting task: " + error);
        return false;
    }
}