function getCache () {

    try {

        let returnValue = JSON.parse(CACHE.get('TASK_CACHE'));
        if (!returnValue) {
            returnValue = {};
        }

        return returnValue;
    }
    catch (error) {
        console.log ("Error getting cache: " + error);
        return false;
    }

}