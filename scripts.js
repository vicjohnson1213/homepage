(function() {
    const clock$ = document.getElementById('clock');
    const date$ = document.getElementById('date');
    const bookmarks$ = document.getElementById('bookmarks');

    setClock();
    setInterval(setClock, 1000);

    function setClock() {
        const now = new Date();
        date$.innerText = now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });

        clock$.innerText = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric'
        });
    }

    chrome.bookmarks.search('homepage', (results) => {
        if (!results.length) {
            return;
        }

        chrome.bookmarks.getSubTree(results[0].id, (subtree) => {
            const homepageDir = subtree[0];
            homepageDir.children.forEach(column => {
                const col$ = document.createElement('div');
                col$.className = 'column';
                bookmarks$.appendChild(col$);

                column.children.forEach(category => {
                    const section$ = document.createElement('div');
                    section$.className = 'section';
                    col$.appendChild(section$);

                    const title$ = document.createElement('div');
                    title$.className = 'title';
                    title$.innerText = category.title;
                    section$.appendChild(title$);

                    const list$ = document.createElement('div');
                    list$.className = 'list';
                    section$.appendChild(list$);

                    category.children.forEach(bookmark => {
                        const bookmark$ = document.createElement('a');
                        bookmark$.href = bookmark.url;
                        bookmark$.innerText = bookmark.title;
                        list$.appendChild(bookmark$);
                    });
                });
            });
        });
    });
})();
