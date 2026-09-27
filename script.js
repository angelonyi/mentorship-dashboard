// Main website JavaScript
// Authentication is handled in auth.js

document.addEventListener("DOMContentLoaded", () => {

    const classDate = document.getElementById("class-date");
    const classWeek = document.getElementById("class-week");
    const progressWeek = document.getElementById("progress-week");
    const progressBar = document.querySelector(".progress-bar");
    const weekIndicators = document.querySelectorAll(".week-indicator");

    if (!classDate || !classWeek) return;

    // Mentorship starts on Sunday, September 27, 2026
    const startDate = new Date("2026-09-27T00:00:00+01:00");

    // Get today's date and time in Nigeria
    const nigeriaParts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).formatToParts(new Date());

    const getPart = (type) =>
        nigeriaParts.find(part => part.type === type)?.value;

    const nigeriaYear = Number(getPart("year"));
    const nigeriaMonth = Number(getPart("month"));
    const nigeriaDay = Number(getPart("day"));
    const nigeriaHour = Number(getPart("hour"));
    const nigeriaMinute = Number(getPart("minute"));

    const today = new Date(
        `${nigeriaYear}-${String(nigeriaMonth).padStart(2, "0")}-${String(nigeriaDay).padStart(2, "0")}T00:00:00+01:00`
    );

    // Calculate how many days have passed since the programme started
    const daysPassed = Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24)
    );

    // Calculate the next class week
    let weekNumber = Math.floor(daysPassed / 7) + 1;

    // If it is Sunday and the class has already ended,
    // move to the following week's class.
    const dayOfWeek = today.getDay();

    if (
        dayOfWeek === 0 &&
        (nigeriaHour > 19 || (nigeriaHour === 19 && nigeriaMinute >= 0))
    ) {
        weekNumber += 1;
    }

    // Keep the programme within 6 weeks
    if (weekNumber < 1) weekNumber = 1;


    // If all 6 weeks are finished
    if (weekNumber > 6) {

        classDate.textContent = "Programme completed";
        classWeek.textContent = "6 Weeks completed";

        if (progressWeek) {
            progressWeek.textContent = "Programme completed";
        }

        if (progressBar) {
            progressBar.style.width = "100%";
        }

        weekIndicators.forEach((indicator) => {
            indicator.classList.add("completed");
            indicator.classList.remove("active");
        });

        return;
    }


    // Calculate the date of the next class
    const nextClassDate = new Date(startDate);

    nextClassDate.setDate(
        startDate.getDate() + ((weekNumber - 1) * 7)
    );


    // Format the class date using Nigerian timezone
    const formattedDate = nextClassDate.toLocaleDateString("en-NG", {
        timeZone: "Africa/Lagos",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });


    // Display next class information
    classDate.textContent = formattedDate;
    classWeek.textContent = `Week ${weekNumber} of 6`;


    // Update programme progress
    if (progressWeek) {
        progressWeek.textContent = `Week ${weekNumber} of 6`;
    }


    // Update progress bar
    if (progressBar) {
        const progressPercentage = (weekNumber / 6) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }


    // Update week indicators
    weekIndicators.forEach((indicator, index) => {

        const week = index + 1;

        indicator.classList.remove("completed", "active");

        if (week < weekNumber) {
            indicator.classList.add("completed");
        }

        if (week === weekNumber) {
            indicator.classList.add("active");
        }
    });

});