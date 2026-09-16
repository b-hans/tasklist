function test () {

    const display = FORMSHEET.getRange("A1");

    const TASK_CACHE = getCache();

    display.setValue ("status: " + TASK_CACHE.status)
}