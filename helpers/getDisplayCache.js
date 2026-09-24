function getDisplayCache () {

    const TASK_DATA = getCache();
    let display;

    if (TASK_DATA && TASK_DATA.display) {
        display = FORMSHEET.getRange(TASK_DATA.display);
    }
    else {
        display = FORMSHEET.getRange("A1");
    }

    return {
        TASK_DATA:  TASK_DATA,
        display:    display
    }

}