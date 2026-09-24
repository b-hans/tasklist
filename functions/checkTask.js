function checkTask (params) {

    const display = params.display;

    try {

        display.setValue ("Do the check");
        return true;
    }
    catch (error){
        display.setValue ("Error in checking task: " + error)
            .setFontColor('red');
        return false;
    }
}