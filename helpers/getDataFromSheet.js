function getDataFromSheet (sheet) {

    const TASK_DATA = getCache();
    let display = FORMSHEET.getRange("A1");

    if (TASK_DATA.display) {
        display = FORMSHEET.getRange(TASK_DATA.display);
    }

    try {

        const data = sheet.getDataRange().getValues();
        const headers = data.shift();

        let returnArray = [];

        if (data.length > 0) {
            for (i=0; i<data.length; i++) {
                let myData = data[i];
                let item = {}

                for (let j=0; j<headers.length; j++) {
                    item[headers[j]] = myData[j]
                }

                returnArray.push (item);
            }
        }

        return returnArray;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error getting data from sheet: " + error);
        return false;
    }
}