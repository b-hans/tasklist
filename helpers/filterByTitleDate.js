function filterByTitleDate (params) {

    const data = params.data;
    const display = params.display;

    try {

        const mostRecent = Object.values (
            data.reduce((acc, current) => {
                const currentTitle = current.task_name;
                const currentDate = new Date(current.due_date);

                // If title doesn't exist yet, or the current item has a newer date, update the map
                if (!acc[currentTitle] || currentDate > new Date(acc[currentTitle].date)) {
                    acc[currentTitle] = current;
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