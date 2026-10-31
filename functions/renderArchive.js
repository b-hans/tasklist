function renderArchive (params) {

    const display = params.display;
    const TASK_DATA = params.TASK_DATA;
    const eValue = params.eValue;

    try {

        TASK_DATA.current_archive = eValue;
        setCache({display: display, data: TASK_DATA});

        // console.log (TASK_DATA);

        const archive = new Archive({display: display, archive: eValue});

        if (!archive.valid) {
            return false;
        }

        console.log (archive);

        display.setValue ("In render check console");
        return true;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error rendering archive: " + error);
        return false;
    }
}