function getCache () {

    try {
        return JSON.parse(CACHE.get('TASK_CACHE'));
    }
    catch (error) {
        console.log ("Error getting cache: " + error);
        return false;
    }

}