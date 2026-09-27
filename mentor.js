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

    if (mentorName) {
        mentorName.textContent = `Welcome, ${fullName}`;
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