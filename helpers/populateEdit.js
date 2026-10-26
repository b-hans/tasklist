function populateEdit () {

    const display_data = getDisplayCache();
    const display = display_data.display;
    const TASK_DATA = display_data.TASK_DATA;

    try {

        clearTaskRange({display: display});

        display.setValue ("Now filter for edit");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error populating edit: " + error);

        return false;
    }

}