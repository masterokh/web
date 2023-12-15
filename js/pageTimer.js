document.addEventListener('DOMContentLoaded', () => {
    let seconds = 0;
    let htmlElement = document.getElementById('page-timer-value');

    function updateTimer() {
        seconds++;
        htmlElement.textContent = seconds.toString();
    }

    setInterval(updateTimer, 1000);
});
