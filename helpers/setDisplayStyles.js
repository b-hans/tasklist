function setDisplayStyles (params) {

    let display = params.display;
    let range = params.range;

    try {

        range.setFontFamily('Trebuchet MS')
            .setFontSize(10)
            .setHorizontalAlignment('left')
            .setVerticalAlignment('top')
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
            .setValue ("Error setting display styles: " + error);
        return false;
    }
}