function isTaskOverDue (params) {

    const taskData = params.taskData;

    try {

        if (taskData.completed) {
            return false;
        }

        const today = new Date();

        if (new Date(taskData.due_date) < today) {
            return true;
        }

        return false;        

    }
    catch (error) {
        console.log("Error checking if task is overdue: " + error);
        return false;
    }
}