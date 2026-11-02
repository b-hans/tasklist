function showArchiveTask (archiveTask) {

    const display = archiveTask.display;

    try {
        console.log (archiveTask);

        display.setValue ("Check console");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue("Error showing archive details: " + error);
        return false;
    }
}