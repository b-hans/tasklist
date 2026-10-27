class Taskdata {
    constructor (params) {
        this.task_name = params.task_name;
        this.assignee = params.assignee;

        try {
            const ss = SpreadsheetApp.openById(DATASHEET_ID);
            const sheet = ss.getSheetByName("Tasks");

            const data = sheet.getDataRange().getValues();

            this.headers = data.shift();

            this.data = data.filter(item => {
                if (item[this.headers.indexOf('task_name')] == this.task_name &&
                    item[this.headers.indexOf('assignee')] == this.assignee) {
                        return true;
                    }

                return false;
            });

        }
        catch (error) {
            console.log ("Error in Taskdata constructor");
            console.log (error);
            return;
        }

    }

    latest () {

        try {
            return this.data.reduce((max, item) => {
                return new Date(item[this.headers.indexOf("due_date")]) > 
                    new Date(max[this.headers.indexOf("due_date")]) ? item : max;
            });
        }
        catch (error) {
            console.log ("Error in getting latest");
            console.log (error);
        }

    }
}