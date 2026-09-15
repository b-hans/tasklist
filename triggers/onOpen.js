function onOpen() {
  var ui = SpreadsheetApp.getUi(); // Use DocumentApp, SlidesApp, or FormApp if not using Sheets
  
  ui.createMenu('Hanson Tasks')
    .addItem('Clear form', 'clearSheet')
    .addSeparator() // Adds a visual line divider
    .addToUi();
}
