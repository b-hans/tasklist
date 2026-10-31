function populateEdit () {

    const display_data = getDisplayCache();
    const display = display_data.display;
    const TASK_DATA = display_data.TASK_DATA;
    const current_data = getTaskData().tasks;

    try {

        clearTaskRange({display: display});

        FORMSHEET.getRange(FORM_FILTERS_RANGE).clear()
            .clearDataValidations()
            .setBackground(FORM_BACKGROUND);

        let editTasks = filterByTitleDate({data: current_data, display: display});

        let mappedArray = editTasks.map (
            task => [
                task.task_name,
                "",
                task.due_date,
                "",
                task.assignee,
                ""
            ]
        );

        let startRow = TASK_START_ROW;

        if (mappedArray.length > 0){
            mappedArray.sort ((a, b) => a[0].localeCompare(b[0]));

            let now = new Date();

            let curRow = startRow;
            let color1 = 'white';
            let color2 = '#f7f5d2';
            let color3 ='#F1BAC4';
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
                    .setHorizontalAlignment('right')
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

        }
        else {
            display.setValue ("No tasks to display");
        }

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error populating edit: " + error);

        return false;
    }

}