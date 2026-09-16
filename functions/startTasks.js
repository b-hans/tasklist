function startTasks () {

    const display = FORMSHEET.getRange("A1");

    if (!clearSheet()) {
        display.setValue ("Problem clearingsheet");
        return false;
    }

    FORMSHEET.getRange("A1:H28").setBackground('#e3eaf5');


    const rowHeight = 24;
    FORMSHEET.setRowHeight(2, rowHeight);
    FORMSHEET.setRowHeight(3, rowHeight);

    let titleRange = FORMSHEET.getRange("B2:G3").merge()
        .setFontFamily('Michroma')
        .setFontSize(24)
        .setHorizontalAlignment('center')
        .setVerticalAlignment('middle')
        .setBackground('white')
        .setBorder(
            true,
            true,
            true,
            true,
            false,
            false,
            '#688cc3',
            SpreadsheetApp.BorderStyle.DOUBLE

        )
        .setValue ('Hanson Tasks');

    setCache({display: display, data: {status: "main_menu"}});


}