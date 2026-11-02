function getCheckBoxRanges (params) {

    const display = params.display;

    try {

        const dataRange = FORMSHEET.getDataRange();
        const validations = dataRange.getDataValidations();
        const startRow = dataRange.getRow();
        const startColumn = dataRange.getColumn();
        
        const checkboxRanges = [];

        // Iterate through the data validation matrix
        for (let r = 0; r < validations.length; r++) {
            for (let c = 0; c < validations[r].length; c++) {
                const rule = validations[r][c];
                
                // Check if the cell has data validation and if it's a checkbox
                if (rule && rule.getCriteriaType() === 
                    SpreadsheetApp.DataValidationCriteria.CHECKBOX) {
                    // Convert the 0-indexed matrix indices back to 
                    // 1-indexed sheet coordinates
                    const cellRange = FORMSHEET.getRange(startRow + r, startColumn + c);
                    checkboxRanges.push(cellRange.getA1Notation());
                }
            }
        }

        return checkboxRanges;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error getting checkbox ranges: " + error);
        return false;
    }
}