function setHeaderStyles (params) {

    let display = params.display;
    let range = params.range;

    try {

        range.setFontFamily('DynaPuff')
            .setFontSize(10)
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
                HEADER_BORDER_COLOR,
                SpreadsheetApp.BorderStyle.SINGLE
        );

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error setting display styles: " + error);
        return false;
    }
}