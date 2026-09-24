function populateTasks (params) {

    const display = params.display;

    try {

        display.setValue ("Populate the tasks");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error populating tasks: " + error);
        return false;
    }
}