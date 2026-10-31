// --- Example Usage ---
function testDateComparison() {

    const cellDate = new Date("2026-10-06T14:30:00"); // Example date
    const result = isOnOrBeforeYesterday(cellDate);
  
    return("Is the date on or before yesterday? " + result);
}