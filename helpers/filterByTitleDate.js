function filterByTitleDate (params) {

    const data = params.data;
    const display = params.display;

    try {

        const mostRecent = Object.values (
            data.reduce((acc, current) => {

                const key = `${current.task_name}-${current.assignee}`;

                // 2. If the key doesn't exist yet, or the current date is newer, update the map
                if (!acc[key] || new Date(current.due_date) > new Date(acc[key].due_date)) {
                    acc[key] = current;
                }
                
                return acc;                
            }, {})
        );

        return mostRecent;
    }
    catch (error) {
        display.setFontColor('red')
            .setValue ("Error filtering the titles by date: " + error);
        return false;
    }
}