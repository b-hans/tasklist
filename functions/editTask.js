function editTask (params) {

    const display = params.display;
    const TASK_DATA = params.TASK_DATA;

    try {

        const task = new Taskdata ({
            task_name:  TASK_DATA.task_name,
            assignee:   TASK_DATA.assignee
        });

        const latest = task.latest();

        if (latest[task.headers.indexOf('completed')]) {
            display.setFontColor('red')
                .setValue ("Can't alter completed tasks");
            return true;
        }

        const newRow = [
            latest[task.headers.indexOf('task_id')],
            FORMSHEET.getRange(CTN_IN).getValue().trim(),
            FORMSHEET.getRange(CDD_IN).getValue().toLocaleDateString('en-US'),
            FORMSHEET.getRange(CRP_IN).getValue(),
            latest[task.headers.indexOf('completed')],
            FORMSHEET.getRange(CAS_IN).getValue(),
            latest[task.headers.indexOf('date_completed')],
        ];

        if (!replaceRowById({display: display, newRow: newRow})) {
            return false;
        }
        
        return startTasks()

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error editing the task: " + error);
        return false;
    }
}