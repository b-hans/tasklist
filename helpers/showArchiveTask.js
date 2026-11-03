function showArchiveTask (archiveTask) {

    const display = archiveTask.display;

    try {
        console.log (archiveTask);

        clearTaskRange({display: display});

        FORMSHEET.getRange("E8:G8")
            .clear()
            .setBackground(FORM_BACKGROUND)
            .clearDataValidations();

        FORMSHEET.getRange(DUE_DATE).setValue("Assignee");

        let datesTitle = FORMSHEET.getRange("F10:G10").merge()
            .setValue("Completed dates");

        display.setValue ("Check console");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error showing archive details: " + error);
        return false;
    }
}