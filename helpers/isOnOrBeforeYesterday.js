/**
 * Checks if a given target date is on or before the previous day (yesterday).
 * @param {Date} targetDate - The date object you want to check.
 * @return {boolean} True if the date is on or before yesterday, false otherwise.
 */
function isOnOrBeforeYesterday(targetDate) {
  // 1. Get the current date and time
  const today = new Date();
  
  // 2. Calculate yesterday's date by subtracting 1 day
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1); // Automatically handles month/year rollbacks
  
  // 3. Normalize both dates to midnight (00:00:00) to clear the time variables
  yesterday.setHours(0, 0, 0, 0);
  
  const targetMidnight = new Date(targetDate);
  targetMidnight.setHours(0, 0, 0, 0);
  
  // 4. Compare timestamps
  return targetMidnight.getTime() <= yesterday.getTime();
}