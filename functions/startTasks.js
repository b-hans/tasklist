function startTasks () {

    let display = FORMSHEET.getRange("A1");
    let TASK_FILTERS = getCache();

    try {
        if (!clearSheet()) {
            display.setFontColor('red')
                .setValue ("Problem clearingsheet");
            return false;
        }

        // set background
        FORMSHEET.getRange(FORM_BACK_RANGE).setBackground(FORM_BACKGROUND);

        // set title
        const rowHeight = 24;
        FORMSHEET.setRowHeight(2, rowHeight);
        FORMSHEET.setRowHeight(3, rowHeight);

        let titleRange = FORMSHEET.getRange(FORM_TITLE_RANGE).merge()
            .setValue ('Hanson Tasks');

        if (!setTitleStyles({display: display, range: titleRange})) {
            return false;
        }

        // set display
        display = FORMSHEET.getRange(FORM_DISPLAY_RANGE)
            .merge()
            .setValue("")
            .setWrap(true);

        if (!setDisplayStyles({display: display, range: display})) {
            return false;
        }

        //set actions
        let actionsRange = FORMSHEET.getRange(FORM_ACTIONS_DROPDOWN)
            .merge();

        if (!setActionStyles({display: display, range: actionsRange})) {
            return false;
        }

        // set tasks headers
        // current tasks
        let currentTasks = FORMSHEET.getRange(CURRENT_TASK)
            .merge()
            .setValue ("Current tasks");

        if (!setHeaderStyles({display: display, range: currentTasks})) {
            return false;
        }

        // dueDate
        let dueDate = FORMSHEET.getRange(DUE_DATE)
            .merge()
            .setValue ("Due date");

        if (!setHeaderStyles({display: display, range: dueDate})) {
            return false;
        }

        // myAssignee
        let myAssignee = FORMSHEET.getRange(ASSIGNEE)
            .merge()
            .setValue ("Assignee");

        if (!setHeaderStyles({display: display, range: myAssignee})) {
            return false;
        }

        // myCompleted
        let myCompleted = FORMSHEET.getRange(COMPLETED)
            .merge()
            .setValue ("Completed");

        if (!setHeaderStyles({display: display, range: myCompleted})) {
            return false;
        }

        // add the date filter
        let dateFilterRange = FORMSHEET.getRange(FORM_DATE_RANGE);

        setActionStyles({display: display, range: dateFilterRange});

        dateFilterRange.setDataValidation(FORM_DATE_RULE);

        if (TASK_FILTERS.date_filter) {
            dateFilterRange.setValue(TASK_FILTERS.date_filter);
        }
        else {
            dateFilterRange.setValue("All");
        }

        let datefilterTitle = FORMSHEET.getRange(FORM_DATE_TITLE_RANGE)
            .setHorizontalAlignment('right')
            .setValue ("Date filter: ");

        // add the assignee dropdown
        let assigneeFilterRange = FORMSHEET.getRange(FORM_ASSIGNEE_RANGE);
        setActionStyles({display: display, range: assigneeFilterRange});
        assigneeFilterRange.setDataValidation(FORM_ASSIGNEE_RULE)
            .setValue ("All");

        let assigneeFilterTitle = FORMSHEET.getRange(FORM_ASSIGNEE_TITLE_RANGE)
            .setHorizontalAlignment('right')
            .setValue("Assignee filter: ");

        let cacheData = {
            status:             "main_menu",
            display:            display.getA1Notation(),
            date_filter:        TASK_FILTERS.date_filter ? TASK_FILTERS.date_filter : "All",
            assignee_filter:    TASK_FILTERS.assignee_filter ? TASK_FILTERS.assign_filter : "All"
        }
        setCache({
            display:    display, 
            data:       cacheData,
        });

        if (!populateTasks()) {
            return false;
        }

        display.setValue("Ready!");
        return true;

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error starting: " + error);
        return false;
    }


}