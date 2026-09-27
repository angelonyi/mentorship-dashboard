// Main website JavaScript
// Authentication is handled in auth.js

document.addEventListener("DOMContentLoaded", async () => {

    const classDate = document.getElementById("class-date");
    const classWeek = document.getElementById("class-week");
    const progressWeek = document.getElementById("progress-week");
    const progressBar = document.querySelector(".progress-bar");
    const weekIndicators = document.querySelectorAll(".week-indicator");
    const meetLink = document.getElementById("meet-link");

    if (!classDate || !classWeek) return;

    // ==========================================
    // 1. PROGRAMME START DATE
    // ==========================================

    // Week 1 started on Sunday, September 27, 2026
    const startDate = new Date("2026-09-27T00:00:00+01:00");


    // ==========================================
    // 2. GET CURRENT NIGERIAN DATE & TIME
    // ==========================================

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


    // ==========================================
    // 3. WORK OUT THE CURRENT/NEXT WEEK
    // ==========================================

    const daysPassed = Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24)
    );

    let weekNumber = Math.floor(daysPassed / 7) + 1;

    // If Sunday class has already ended at 7 PM,
    // move to the following week's class.
    const dayOfWeek = today.getDay();

    if (
        dayOfWeek === 0 &&
        (nigeriaHour > 19 || (nigeriaHour === 19 && nigeriaMinute >= 0))
    ) {
        weekNumber += 1;
    }


    // ==========================================
    // 4. PROGRAMME COMPLETED
    // ==========================================

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

        if (meetLink) {
            meetLink.removeAttribute("href");
            meetLink.textContent = "PROGRAMME COMPLETED";
        }

        return;
    }


    // ==========================================
    // 5. CALCULATE NEXT CLASS DATE
    // ==========================================

    const nextClassDate = new Date(startDate);

    nextClassDate.setDate(
        startDate.getDate() + ((weekNumber - 1) * 7)
    );


    // ==========================================
    // 6. DISPLAY CLASS DATE
    // ==========================================

    const formattedDate = nextClassDate.toLocaleDateString("en-NG", {
        timeZone: "Africa/Lagos",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    classDate.textContent = formattedDate;
    classWeek.textContent = `Week ${weekNumber} of 6`;


    // ==========================================
    // 7. UPDATE PROGRAMME PROGRESS
    // ==========================================

    if (progressWeek) {
        progressWeek.textContent = `Week ${weekNumber} of 6`;
    }


    // ==========================================
    // 8. UPDATE PROGRESS BAR
    // ==========================================

    if (progressBar) {
        const progressPercentage = (weekNumber / 6) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }


    // ==========================================
    // 9. UPDATE WEEK INDICATORS
    // ==========================================

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


    // ==========================================
    // 10. GET GOOGLE MEET LINK FROM SUPABASE
    // ==========================================

    if (meetLink) {

        const { data, error } = await supabaseClient
            .from("classes")
            .select("meet_link")
            .eq("week_number", weekNumber)
            .single();

        if (error) {

            console.error("Could not load Meet link:", error);

            meetLink.removeAttribute("href");
            meetLink.textContent = "MEET LINK NOT AVAILABLE";

        } else if (data && data.meet_link) {

            // Put the Meet link on the JOIN LIVE button
            meetLink.href = data.meet_link;

        } else {

            // No link has been added to Supabase yet
            meetLink.removeAttribute("href");
            meetLink.textContent = "MEET LINK NOT AVAILABLE";

        }
    }

});