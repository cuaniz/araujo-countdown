const CONTRACT_START = new Date('2025-01-23T00:00:00');
const CONTRACT_END = new Date('2031-06-30T23:59:59');
const WEEKLY_SALARY_EUR = 240385;
const EUR_TO_USD = 1.08;

const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const costEurEl = document.getElementById('cost-eur');
const costUsdEl = document.getElementById('cost-usd');

function updateCountdown() {
    const now = new Date();
    const diff = CONTRACT_END - now;

    if (diff <= 0) {
        yearsEl.textContent = '0';
        monthsEl.textContent = '0';
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minutesEl.textContent = '0';
        secondsEl.textContent = '0';
        return;
    }

    let years = CONTRACT_END.getFullYear() - now.getFullYear();
    let months = CONTRACT_END.getMonth() - now.getMonth();
    let days = CONTRACT_END.getDate() - now.getDate();
    let hours = CONTRACT_END.getHours() - now.getHours();
    let minutes = CONTRACT_END.getMinutes() - now.getMinutes();
    let seconds = CONTRACT_END.getSeconds() - now.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

function updateCost() {
    const now = new Date();
    const elapsed = now - CONTRACT_START;

    if (elapsed <= 0) {
        costEurEl.textContent = '0';
        costUsdEl.textContent = '0';
        return;
    }

    const salaryPerMs = (WEEKLY_SALARY_EUR * 52) / (365 * 24 * 60 * 60 * 1000);
    const totalCostEur = Math.floor(elapsed * salaryPerMs);
    const totalCostUsd = Math.floor(totalCostEur * EUR_TO_USD);

    costEurEl.textContent = totalCostEur.toLocaleString('de-DE');
    costUsdEl.textContent = totalCostUsd.toLocaleString('en-US');
}

setInterval(() => {
    updateCountdown();
    updateCost();
}, 1000);

updateCountdown();
updateCost();
