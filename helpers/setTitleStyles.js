function setTitleStyles (params) {

    let display = params.display;
    let range = params.range;

    try {

        range.setFontFamily('Michroma')
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
                TITLE_BORDER_COLOR,
                SpreadsheetApp.BorderStyle.DOUBLE
        );

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error setting title styles: " + error);
        return false;
    }
}