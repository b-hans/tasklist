function setCache (params) {

    const display = params.display;
    const data = params.data;

    try {

        CACHE.put('TASK_CACHE', JSON.stringify(data), 3600);
        return true;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error setting cache: " + error);
        return false;
    }

}