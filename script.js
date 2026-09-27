// Main website JavaScript
// Authentication is handled in auth.js

document.addEventListener("DOMContentLoaded", () => {

    const classDate = document.getElementById("class-date");
    const classWeek = document.getElementById("class-week");

    if (!classDate || !classWeek) return;

    // Mentorship starts on Sunday, September 27, 2026
    const startDate = new Date("2026-09-27T00:00:00+01:00");

    // Get today's date in Nigeria
    const nigeriaDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    const today = new Date(`${nigeriaDate}T00:00:00+01:00`);

    // Calculate how many days have passed
    const daysPassed = Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24)
    );

    // Calculate current week
    let weekNumber = Math.floor(daysPassed / 7) + 1;

    // Keep the programme between Week 1 and Week 6
    if (weekNumber < 1) weekNumber = 1;
    if (weekNumber > 6) weekNumber = 6;

    // Calculate the Sunday for this week's class
    const currentClassDate = new Date(startDate);

    currentClassDate.setDate(
        startDate.getDate() + ((weekNumber - 1) * 7)
    );

    // Display the date
    const formattedDate = currentClassDate.toLocaleDateString("en-NG", {
        timeZone: "Africa/Lagos",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    classDate.textContent = formattedDate;
    classWeek.textContent = `Week ${weekNumber} of 6`;
});// Update programme progress
const progressWeek = document.getElementById("progress-week");
const progressBar = document.querySelector(".progress-bar");
const weekIndicators = document.querySelectorAll(".week-indicator");

if (progressWeek) {
    progressWeek.textContent = `Week ${weekNumber} of 6`;
}

if (progressBar) {
    const progressPercentage = (weekNumber / 6) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

weekIndicators.forEach((indicator, index) => {
    const week = index + 1;

    indicator.classList.remove("completed", "active");

    if (week < weekNumber) {
        indicator.classList.add("completed");
    } else if (week === weekNumber) {
        indicator.classList.add("active");
    }
});