class Task {
    constructor (task_id) {

        let sheet = SpreadsheetApp.openById(DATASHEET_ID)
            .getSheetByName("Tasks");

        let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn())
            .getValues()[0];

        let idsFlat = sheet.getRange(1, 1, sheet.getLastRow(), 1)
            .getValues().flat();

        let myRow = idsFlat.indexOf(task_id) + 1;

        let myData = sheet.getRange(myRow, 1, 1, sheet.getLastColumn())
            .getValues()[0];

        this.sheet = sheet;
        this.headers = headers;

        for (let i=0; i<headers.length; i++) {
            this[headers[i]] = myData[i]
        }

    }

    update() {
        this.completed = true;
        this.date_completed = new Date();

        let rowToUpdate = [
            this.task_id,
            this.task_name,
            this.due_date,
            this.repeat_type,
            this.completed,
            this.assignee,
            this.date_completed,
        ];

        let idsFlat = this.sheet.getRange(1, 1, this.sheet.getLastRow(), 1)
            .getValues().flat();

        let myRow = idsFlat.indexOf(this.task_id) + 1;

        let myData = this.sheet.getRange(myRow, 1, 1, rowToUpdate.length)
            .setValues([rowToUpdate]);

        let newId = Math.max(...idsFlat.slice(1)) + 1;
        
        let new_due_date = new Date(this.due_date);

        switch (this.repeat_type) {

            case "None":
                return true;
                
            case "Weekly":
                new_due_date.setDate(new_due_date.getDate() + 7);
                break;

            case "Bi-weekly":
                new_due_date.setDate(new_due_date.getDate() + (2*7));
                break;

            case "Monthly":
                new_due_date.setMonth(new_due_date.getMonth() + 1);
                break;

            case "Bi-monthly":
                new_due_date.setMonth(new_due_date.getMonth() + 2);
                break;

            case "Quarterly":
                new_due_date.setMonth(new_due_date.getMonth() + 3);
                break;

            case "Annually":
                new_due_date.setFullYear(new_due_date.getFullYear() + 1);
                break;

            case "Semi-annually":                
                new_due_date.setMonth(new_due_date.getMonth() + 6);
                break;

            default:
                return true;
        }

        let newRow = [
            newId,
            this.task_name,
            new_due_date,
            this.repeat_type,
            false,
            this.assignee,
            ""
        ];

        this.sheet.appendRow(newRow);

        return true;

    }
}