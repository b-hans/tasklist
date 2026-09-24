function assignTask (params) {

    const display = params.display;

    try {

        return {
            name:       FORMSHEET.getRange(CTN_IN).getValue().trim(),
            due_date:   FORMSHEET.getRange(CDD_IN).getValue(),
            repeat:     FORMSHEET.getRange(CRP_IN).getValue(),
            assignee:   FORMSHEET.getRange(CAS_IN).getValue()
        }

    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error assigning: " + error);
        return false;
    }
}