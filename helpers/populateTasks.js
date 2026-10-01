function populateTasks () {

    const display_data = getDisplayCache();
    const display = display_data.display;
    const TASK_DATA = display_data.TASK_DATA;

    try {

        let myData = getTaskData();
        let tasks = myData.tasks;
        let headers = getHeaders({display: display});

        clearTaskRange({display: display});

        if (!headers) {
            return false;
        }

        let taskHeaders = headers.tasks;

        if (tasks.length <= 0) {
            display.setValue ("Ready!");
            return true;
        }

        let startRow = TASK_START_ROW;

        let openTasks = tasks
            .filter (
                task => {
                    const strValue = String(task.completed).trim().toLowerCase();

                    if (!task.completed || strValue === "false" || strValue === "") {
                        return true;
                    }
                    else {
                        return false;
                    }

                }
            );
        //     .map (
        //         task => [
        //             task.task_name,
        //             "",
        //             task.due_date,
        //             "",
        //             task.assignee,
        //             task.completed
        //         ]
        // );

        let filteredArray;

        switch (TASK_DATA.date_filter) {

            case "This week":

                const now = new Date();
                
                // 1. Calculate the start of the current week (Sunday at 00:00:00)
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                startOfWeek.setHours(0, 0, 0, 0);

                // 2. Calculate the end of the current week (Saturday at 23:59:59)
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                endOfWeek.setHours(23, 59, 59, 999);

                // 3. Filter the array
                filteredArray = openTasks.filter(task => {
                    const dueDate = new Date(task.due_date);
                    return dueDate >= startOfWeek && dueDate <= endOfWeek;
                });                
                
                break;

            case "Today":
                const todayStr = new Date().toDateString();

                // Filter the array
                filteredArray = openTasks.filter(task => {
                    return new Date(task.due_date).toDateString() === 
                        todayStr;
                });     
                
                break;

            case undefined:
                filteredArray = openTasks;
                break;

            default:
                filteredArray = openTasks;
                break;
        }

        let mappedArray = filteredArray.map (
            task => [
                task.task_name,
                "",
                task.due_date,
                "",
                task.assignee,
                task.completed
            ]
        );

        mappedArray.sort ((a, b) => new Date(a[2]) - new Date(b[2]));

        let curRow = startRow;
        let color1 = 'white';
        let color2 = '#f7f5d2';
        for (let i=0; i<mappedArray.length; i++) {
            let bcolor;
            if (i % 2 === 0) {
                bcolor = color2;
            }
            else {
                bcolor = color1;
            }

            let range = FORMSHEET.getRange(curRow, 2, 1, 2)
                .merge()
                .setBackground(bcolor);

            range = FORMSHEET.getRange(curRow, 4, 1, 2)
                .merge()
                .setBackground(bcolor);

            range = FORMSHEET.getRange(curRow, 6, 1, 1)
                .setBackground(bcolor)
                .setHorizontalAlignment('center');

            range = FORMSHEET.getRange(curRow++, 7, 1, 1)
                .setBackground(bcolor)
                .setHorizontalAlignment('center');
        }

        let taskRange = FORMSHEET.getRange(
            startRow,
            2,
            mappedArray.length,
            6
        ).setValues(mappedArray);

        let checkRange = FORMSHEET.getRange(
            startRow,
            7,
            mappedArray.length,
            1
        ).insertCheckboxes();

        display.setValue ("Ready!");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error populating tasks: " + error);
        return false;
    }
}