function setCreateHeadingStyle (params) {

    let display = params.display;
    let range = params.range;

    try {

        range.setFontFamily('Georgia')
            .setFontSize(10)
            .setHorizontalAlignment('right')
            .setVerticalAlignment('top')
            .setBackground('#fce5cd');

        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error setting display styles: " + error);
        return false;
    }
}