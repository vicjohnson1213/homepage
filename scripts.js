(function() {
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');
    setClock();
    setInterval(setClock, 1000);

    function setClock() {
        const now = new Date();
        date.innerHTML = now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });

        clock.innerHTML = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric'
        });
    }
})();