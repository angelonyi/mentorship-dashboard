// Mentor Area Authentication

document.addEventListener("DOMContentLoaded", async () => {

    const mentorName = document.getElementById("mentor-name");
    const logoutButton = document.getElementById("mentor-logout");

    // Check the logged-in user
    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    // No logged-in user
    if (error || !user) {
        window.location.href = "login.html";
        return;
    }

    // Check the user's role
    const role = user.app_metadata?.role;

    // Only mentors can access this page
    if (role !== "mentor") {
        window.location.href = "dashboard.html";
        return;
    }

    // Show mentor's name
    const fullName =
        user.user_metadata?.full_name || "Mentor";

    // Load the next class from Supabase
    const classDateElement = document.getElementById("mentor-class-date");
    const classWeekElement = document.getElementById("mentor-class-week");

    if (classDateElement && classWeekElement) {
        const now = new Date();

        const today =
            `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

        const { data: nextClass, error: classError } = await supabaseClient
            .from("classes")
            .select("class_date, week_number")
            .gte("class_date", today)
            .order("class_date", { ascending: true })
            .limit(1)
            .maybeSingle();

        if (classError) {
            console.error("Error loading next class:", classError);
            classDateElement.textContent = "Unable to load class";
            classWeekElement.textContent = "Please try again";
        } else if (!nextClass) {
            classDateElement.textContent = "No upcoming classes";
            classWeekElement.textContent = "";
        } else {
            const date = new Date(`${nextClass.class_date}T12:00:00`);

            classDateElement.textContent = date.toLocaleDateString(
                "en-NG",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

            classWeekElement.textContent = `Week ${nextClass.week_number}`;
        }
    }


    // Logout
    if (logoutButton) {

        logoutButton.addEventListener("click", async (event) => {

            event.preventDefault();

            await supabaseClient.auth.signOut();

            window.location.href = "login.html";

        });

    }

});