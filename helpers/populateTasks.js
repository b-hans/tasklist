function populateTasks (params) {

    const display = params.display;

    try {

        let myData = getTaskData();
        let tasks = myData.tasks;

        let startRow = TASK_START_ROW;

        let mappedArray = tasks
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
            )
            .map (
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