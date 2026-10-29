class Taskdata {
    constructor (params) {
        this.task_name = params.task_name;
        this.assignee = params.assignee;

        try {
            this.ss = SpreadsheetApp.openById(DATASHEET_ID);
            this.sheet = this.ss.getSheetByName("Tasks");

            const data = this.sheet.getDataRange().getValues();

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

        if (this.data.length < 1) {
            return false;
        }

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

    archive () {

        try {

            const dateCompletedRow = this.headers.indexOf('date_completed');

            const archiveData = this.data.filter(item => {
                return item[this.headers.indexOf('completed')];
            });

            if (archiveData.length > 0) {

                const groupedByYear = archiveData.reduce((acc, row) => {
                    const year = new Date(row[dateCompletedRow]).getFullYear();
                    if (!acc[year]) {
                        acc[year] = [];
                    }
                    acc[year].push(row);
                    return acc;
                }, {});        

                const resultArrays = Object.values(groupedByYear);

                for (let i=0; i<resultArrays.length; i++) {
                    let array = resultArrays[i];
                    let year = new Date(array[0][dateCompletedRow]).getFullYear();
                    let tabName = "Archive: " + year;

                    let sheet = this.ss.getSheetByName(tabName);

                    if (!sheet) {
                        sheet = this.ss.insertSheet(tabName);
                        sheet.appendRow(this.headers);
                    }

                    let startRow = sheet.getLastRow() + 1;
                    let startColumn = 1;

                    let numRows = array.length;
                    let numCols = array[0].length;

                    sheet.getRange(startRow, startColumn, numRows, numCols)
                        .setValues(array);

                }

            }

            let data = this.sheet.getDataRange().getValues();
            
            const colAIndex = this.headers.indexOf('task_name');
            const colBIndex = this.headers.indexOf('assignee');

            // Loop backwards from the bottom row to the top row (skipping row 1 header if needed)
            for (let j = data.length - 1; j >= 1; j--) {
                // Apps Script arrays are 0-indexed, so we subtract 1 from our column indices
                let cellValueA = data[j][colAIndex];
                let cellValueB = data[j][colBIndex];
                
                // Check if both conditions match
                if (cellValueA === this.task_name && cellValueB === this.assignee) {
                    // deleteRow expects a 1-based index, so row index is i + 1
                    this.sheet.deleteRow(j + 1);
                }
            }        

            return startTasks();
    
        }
        catch (error) {
            console.log ("Error archiving: " + error);
            return false;
        }
   }
}