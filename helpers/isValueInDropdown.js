function isValueInDropdown (params) {

    const display = params.display;
    const rangeA1 = params.rangeA1;

    try {

        /**
         * Checks if a cell's current value is one of its dropdown options.
         * @param {string} rangeA1 - The cell coordinate (e.g., "A1").
         * @returns {boolean} True if the value is a valid dropdown option, false otherwise.
         */
        const sheet = FORMSHEET;
        const cell = sheet.getRange(rangeA1);
        const cellValue = cell.getValue();
        
        // 1. Get the data validation rule applied to the cell
        const rule = cell.getDataValidation();
        
        // If there is no dropdown or validation rule, return false
        if (!rule) {
            return false;
        }
        
        // 2. Get the validation criteria type and the underlying values
        const criteriaType = rule.getCriteriaType();
        const args = rule.getCriteriaValues(); //
        
        let dropdownOptions = [];
        
        // Scenario A: The dropdown is built from a list of items
        if (criteriaType === SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) {
            dropdownOptions = args[0]; 
        } 
        // Scenario B: The dropdown is built from a sheet range
        else if (criteriaType === SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE) {
            const range = args[0]; // Returns a Range object
            // Flatten the 2D array of range values into a 1D array of strings/numbers
            dropdownOptions = range.getValues().flat();
        } 
        // If the cell has data validation but it's not a dropdown (e.g., text contains, date is valid)
        else {
            return false;
        }
        
        // 3. Evaluate if the cell's current value exists in the options array
        // We use string conversion to ensure type mismatches (like number vs string) don't break the check
        const isValid = dropdownOptions.map(String).includes(String(cellValue));
        
        return isValid;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error determining dropdown validity: " + error);
        return false;
    }

}