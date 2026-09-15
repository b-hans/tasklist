function onOpen() {
  var ui = SpreadsheetApp.getUi(); // Use DocumentApp, SlidesApp, or FormApp if not using Sheets
  
  ui.createMenu('Hanson Tasks')
    .addItem('test', 'test')
    .addSeparator() // Adds a visual line divider
    .addToUi();
}
