/**
 * Helper function to verify if a variable is a valid Date object
 */
function isValidDate (params) {

    const d = params.d;
    const display = params.display;

    try {
        
        // 1. Check if the value is a built-in JavaScript Date object
        if (Object.prototype.toString.call(d) !== "[object Date]") {
            return false;
        }
        // 2. Check if the date is valid (e.g., not "Invalid Date" / NaN)
        return !isNaN(d.getTime());

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error validating date: " + error);
        return false;
    }

}