function verifyCancel (params) {

    const display = params.display;

    try {

        let data = assignTask({display: display});

        if (!data) {
            return false;
        }

        if (!data.name &&
            !data.due_date &&
            data.repeat == "Select one" &&
            data.assignee == "Select one"
        ) {
            return true;
        }
        else {
            return false;
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error verifying cancel: " + error);
        return false;
    }
}