function editTaskForm (params) {

    const e = params.e;
    const display = params.display;
    const eRange = e.range;
    const eValue = eRange.getValue();
    const a1 = eRange.getA1Notation();

    try {

        display.setValue ("In edit task");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error getting the edit view: " + error);

        return false;
    }
}