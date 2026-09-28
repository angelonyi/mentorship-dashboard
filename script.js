
document.addEventListener("DOMContentLoaded", async () => {
    const classDate = document.getElementById("class-date");
    const classWeek = document.getElementById("class-week");
    const progressWeek = document.getElementById("progress-week");
    const progressBar = document.querySelector(".progress-bar");
    const weekIndicators = document.querySelectorAll(".week-indicator");
    const meetLink = document.getElementById("meet-link");

    if (!classDate || !classWeek) return;

    const DAY_MS = 24 * 60 * 60 * 1000;
    const WEEK_MS = 7 * DAY_MS;
    const startDate = new Date(Date.UTC(2026, 8, 27));

    // Get the current date and time in Nigeria.
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).formatToParts(new Date());

    const getPart = (type) =>
        parts.find((part) => part.type === type)?.value;

    const year = Number(getPart("year"));
    const month = Number(getPart("month"));
    const day = Number(getPart("day"));
    const hour = Number(getPart("hour"));

    const today = new Date(Date.UTC(year, month - 1, day));
    const daysPassed = Math.floor(
        (today.getTime() - startDate.getTime()) / DAY_MS
    );
    const dayOfWeek = today.getUTCDay();

    const programmeCompleted =
        daysPassed > 35 ||
        (daysPassed === 35 && dayOfWeek === 0 && hour >= 19);

    // Calculate the current programme week.
    const currentWeek = Math.max(
        1,
        Math.min(6, Math.floor(daysPassed / 7) + 1)
    );

    // Update the progress heading and bar.
    if (progressWeek) {
        progressWeek.textContent = programmeCompleted
            ? "Programme completed"
            : `Week ${currentWeek} of 6`;
    }

    if (progressBar) {
        progressBar.style.width = programmeCompleted
            ? "100%"
            : `${(currentWeek / 6) * 100}%`;
    }

    // Update the six week indicators.
    weekIndicators.forEach((indicator, index) => {
        const week = index + 1;

        indicator.classList.remove("completed", "active");

        if (programmeCompleted || week < currentWeek) {
            indicator.classList.add("completed");
        } else if (week === currentWeek) {
            indicator.classList.add("active");
        }
    });

    // Keep the Join Live button visible.
    if (meetLink) {
        meetLink.innerHTML =
            '<span class="live-dot"></span> JOIN LIVE <span class="arrow">→</span>';

        meetLink.removeAttribute("href");

        // Do nothing when no meeting link has been added.
        meetLink.onclick = (event) => {
            if (!meetLink.getAttribute("href")) {
                event.preventDefault();
            }
        };
    }

    // Stop here if all six weeks are complete.
    if (programmeCompleted) {
        classDate.textContent = "Programme completed";
        classWeek.textContent = "6 Weeks completed";

        if (meetLink) {
            meetLink.removeAttribute("href");
            meetLink.textContent = "PROGRAMME COMPLETED";
        }

        return;
    }

    // Calculate the next Sunday class.
    let nextClassDate;

    if (today.getTime() < startDate.getTime()) {
        nextClassDate = new Date(startDate);
    } else {
        let daysUntilSunday = (7 - dayOfWeek) % 7;

        if (daysUntilSunday === 0 && hour >= 19) {
            daysUntilSunday = 7;
        }

        nextClassDate = new Date(
            today.getTime() + daysUntilSunday * DAY_MS
        );
    }

    const nextClassWeek =
        Math.floor(
            (nextClassDate.getTime() - startDate.getTime()) / WEEK_MS
        ) + 1;

    // Display the next class date.
    classDate.textContent = nextClassDate.toLocaleDateString("en-NG", {
        timeZone: "Africa/Lagos",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    classWeek.textContent = `Week ${nextClassWeek} of 6`;

    // Load the next class's Google Meet link.
    if (meetLink) {
        try {
            const { data, error } = await supabaseClient
                .from("classes")
                .select("meet_link")
                .eq("week_number", nextClassWeek)
                .maybeSingle();

            if (error) {
                console.error("Could not load Meet link:", error);
            } else if (data?.meet_link) {
                meetLink.href = data.meet_link;
                meetLink.target = "_blank";
                meetLink.rel = "noopener noreferrer";
            }
        } catch (error) {
            console.error("Unexpected error loading Meet link:", error);
        }

        // Keep the button label even when Supabase has no link.
        meetLink.innerHTML =
            '<span class="live-dot"></span> JOIN LIVE <span class="arrow">→</span>';
    }
});