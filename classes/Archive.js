class Archive {
    constructor (params) {
        const display = params.display;
        this.sheetName = params.archive;

        const ss = SpreadsheetApp.openById(DATASHEET_ID);
        const sheet = ss.getSheetByName(this.sheetName);

        this.data = sheet.getDataRange().getValues();
        this.headers = this.data.shift();

        this.displayArray = this.getDisplayArray();

        this.valid = true;
        return;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error in archive constructor");
        this.valid = false;
        return;
    }

    getDisplayArray () {

        var uniqueMap = new Map();
        const headers = this.headers;

        this.data.forEach (row => {

            const task_name = row[headers.indexOf('task_name')];
            const assignee = row[headers.indexOf('assignee')];
            
            const key = `${task_name}|${assignee}`;
            const currentDate = new Date(row[headers.indexOf('date_completed')]);
            const myRow = row;

            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, myRow);
            }
            else {
                const existingDate = new Date(
                    uniqueMap.get(key)[headers.indexOf('date_completed')]
                );
                if (currentDate > existingDate) {
                    uniqueMap.set(key, myRow);
                }
            }

        });

        const filteredData = Array.from(uniqueMap.values());

        return filteredData;
    }
}