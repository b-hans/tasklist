function setActionStyles (params) {

    let display = params.display;
    let range = params.range;

    try {

        range.setFontFamily('Georgia')
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
                HEADER_BORDER_COLOR,
                SpreadsheetApp.BorderStyle.SINGLE
        );

        range.setDataValidation(FORM_ACTIONS_RULE)
            .setValue("Actions").activate();

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error setting display styles: " + error);
        return false;
    }
}