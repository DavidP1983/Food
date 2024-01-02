
function timer(parent, deadLine) {

        function getTimeRemaining(endtime) {
            let days, hours, munites, seconds;
    
            const total = Date.parse(endtime) - Date.parse(new Date()); // total ms
    
            if (total <= 0) {
                days = 0;
                hours = 0;
                munites = 0;
                seconds = 0;
            } else {
                days = Math.floor(total / (86400000));
                hours = Math.floor((total / (1000 * 60 * 60) % 24));
                munites = Math.floor((total / 1000 / 60) % 60);
                seconds = Math.floor((total / 1000) % 60);
    
            }
    
            return {
                total,
                days,
                hours,
                munites,
                seconds
            };
        }
    
        function getZero(num) {
            return num >= 0 && num < 10 ? `0${num}` : num;
        }
    
        function setClock(parent, endtime) {
            const timer = document.querySelector(parent),
                day = timer.querySelector('#days'),
                hour = timer.querySelector('#hours'),
                munite = timer.querySelector('#minutes'),
                second = timer.querySelector('#seconds');
    
            const startClock = setInterval(start, 1000);
    
            start();
    
            function start() {
                const { total, days, hours, munites, seconds } = getTimeRemaining(endtime);
                day.innerHTML = getZero(days);
                hour.innerHTML = getZero(hours);
                munite.innerHTML = getZero(munites);
                second.innerHTML = getZero(seconds);
    
                if (total <= 0) {
                    clearInterval(startClock);
                }
            }
        }
    
        setClock(parent, deadLine);    
}

export default timer;