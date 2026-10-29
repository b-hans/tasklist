/**
 * Overwrites a row in a Google Sheet when an ID matches.
 * 
 */
function replaceRowById(params) {

    const display = params.display;
    const newRowValues = params.newRow;

    const targetId = newRowValues[0];

    try {

        const ss = SpreadsheetApp.openById(DATASHEET_ID);
        const sheet = ss.getSheetByName("Tasks"); 
        
        const idColumnIndex = 1; // 👈 1 means Column A. Change if your ID is in a different column.
        const startRow = 2;      // 👈 Assumes Row 1 has headers. Change to 1 if there are no headers.
        
        // 1. Fetch all ID data from the specific column to optimize performance
        const lastRow = sheet.getLastRow();

        if (lastRow < startRow) {
            display.setFontColor ('red')
                .setValue ("Sheet is empty or only contains headers.");
            return false;
        }
        
        const idRange = sheet.getRange(startRow, idColumnIndex, lastRow - startRow + 1, 1);
        const idValues = idRange.getValues(); // Returns a 2D array: [[id1], [id2], ...]
        
        // 2. Locate the row index containing the matching ID
        let targetRowIndex = -1;
        for (let i = 0; i < idValues.length; i++) {
            // Check if the current row's ID matches (using loose or strict equality depending on format)
            if (idValues[i][0].toString() === targetId.toString()) {
                targetRowIndex = startRow + i; 
                break;
            }
        }
        
        // 3. If found, overwrite the entire row with the new data
        if (targetRowIndex !== -1) {
            // setValues() requires a 2D array structure: [[val1, val2, val3...]]
            const updateRange = sheet.getRange(targetRowIndex, 1, 1, newRowValues.length);
            updateRange.setValues([newRowValues]);
            return true;
        } else {
            display.setFontColor('red')
                .setValue(`ID: ${targetId} not found in the sheet.`);
            return false;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error updating data sheet: " + error);
        return false;
    }

}