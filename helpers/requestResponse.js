function requestResponse (params) {

    const display = params.display;
    const eValue = params.eValue;

    const TASK_DATA = getCache();
    TASK_DATA.in_response = true;

    try {

        if (TASK_DATA.status == "create_task") {

            TASK_DATA.response_message = "You are about to Cancel\n" +
                "Do you wish to proceed?";

            setCache({display: display, data: TASK_DATA});

            display.setHorizontalAlignment('right').setFontColor('red')
                .setValue(TASK_DATA.response_message);

            FORMSHEET.getRange(CDD_IN).disabled = true;

            let reList = [
                'Select one',
                'Yes, cancel',
                'No, return'
            ];

            let reRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(reList, true)
                .setAllowInvalid(true)
                .build();

            let resRange = FORMSHEET.getRange(RESPONSE_DD)
                .setBackground('#eeb7be')
                .setDataValidation(reRule)
                .setValue("Select one")
                .activate();

        }
        else {
            display.setValue ("Hey get response");
            return true;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error display response: " + error);
        return false;
    }


}