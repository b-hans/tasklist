function getDisplay () {

    let TASK_DATA = getCache();

    if (TASK_DATA && TASK_DATA.display) {
        return (FORMSHEET.getRange(TASK_DATA.display));
    }
    else {
        return (FORMSHEET.getRange("A1"));
    }

}