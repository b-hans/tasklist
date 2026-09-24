function requestResponse (params) {

    const eValue = params.eValue;

    const data_display = getDisplayCache();
    let display = data_display.display;

    const TASK_DATA = data_display.TASK_DATA;
    TASK_DATA.in_response = true;

    try {

        if (TASK_DATA.status == "create_task") {

            let response_message;
            let reList;
            let reRule;
            let resRange = FORMSHEET.getRange(RESPONSE_DD);

            switch (eValue) {
                case "Cancel":

                    response_message = "You are about to Cancel\n" +
                        "Do you wish to proceed?";

                    reList = [
                        'Select one',
                        'Yes, cancel',
                        'No, return'
                    ];

                    break;

                case "Enter":
                    response_message = "You are about to enter this task\n" +
                        "Do you wish to proceed?";

                    reList = [
                        'Select one',
                        'Yes, enter',
                        'No, return'
                    ];

                    break;

                default:
                    return true;

            }

            reRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(reList, true)
                .setAllowInvalid(true)
                .build();

            resRange.setBackground('#eeb7be')
                .setDataValidation(reRule)
                .setValue("Select one")
                .activate();

            display.setHorizontalAlignment('right').setFontColor('red')
                .setValue(response_message);

            TASK_DATA.response_message = response_message;

            setCache({display: display, data: TASK_DATA});

            return true;

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