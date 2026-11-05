function applyHeaderStyle (range) {

    const HEAD_STYLE = {
        fontFamily:             "DynaPuff",
        fontSize:               10,
        horizontalAlignment:    "center",
        verticalAlignment:      "middle",
        backgroundColor:        "white",
    }

    range.setFontFamily(HEAD_STYLE.fontFamily)
        .setFontSize(HEAD_STYLE.fontSize)
        .setHorizontalAlignment(HEAD_STYLE.horizontalAlignment)
        .setVerticalAlignment(HEAD_STYLE.verticalAlignment)
        .setBackgroundColor(HEAD_STYLE.backgroundColor)
        .setBorder(
                true, true, true, true, false, false,
                "black",
                SpreadsheetApp.BorderStyle.SINGLE
            );

    return true;
}