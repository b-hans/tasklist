function runTests () {
    const display_data = getDisplayCache();
    let display = display_data.display;

    try {
        if (!clearSheet()) {
            display.setFontColor('red')
                .setValue ("Problem clearingsheet");
            return false;
        }

        // set background
        FORMSHEET.getRange(FORM_BACK_RANGE).setBackground(FORM_BACKGROUND)
            .setBorder(false, false, false, false, false, false);

        // set title
        const rowHeight = 24;
        FORMSHEET.setRowHeight(2, rowHeight);
        FORMSHEET.setRowHeight(3, rowHeight);

        let titleRange = FORMSHEET.getRange(FORM_TITLE_RANGE).merge()
            .setValue ('Running tests');

        if (!setTitleStyles({display: display, range: titleRange})) {
            return false;
        }

        display = FORMSHEET.getRange("B5:G27").merge()
            .setBackground('white')
            .setHorizontalAlignment('left')
            .setVerticalAlignment('top')
            .setFontFamily("Georgia")
            .setFontColor('blue')
            .setBorder(
                true,
                true,
                true,
                true,
                false,
                false,
                TITLE_BORDER_COLOR,
                SpreadsheetApp.BorderStyle.DOUBLE

            ).setValue('Running tests\n\n');

        display.setValue (display.getValue() + testDateComparison() + "\n\n");

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error running tests: " + error);
        return false;
    }
}