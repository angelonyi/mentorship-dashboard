document.addEventListener("DOMContentLoaded", async () => {
    const menteesContainer = document.getElementById("mentees-container");
    if (!menteesContainer) return;

    // Check if user is authenticated and is a mentor
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    if (user.app_metadata?.role !== "mentor") {
        // Not a mentor, redirect to their dashboard
        window.location.href = "dashboard.html";
        return;
    }

    try {
        // Fetch mentees from the profiles table
        // We only want users who are not mentors
        const { data, error } = await supabaseClient
            .from("profiles")
            .select("full_name, email")
            .neq("role", "mentor");

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            menteesContainer.innerHTML = '<div class="empty">No mentees found.</div>';
            return;
        }

        menteesContainer.innerHTML = '';
        const listDiv = document.createElement("div");
        listDiv.className = "mentees-list";

        data.forEach(mentee => {
            const card = document.createElement("div");
            card.className = "mentee-card";
            card.innerHTML = `
                <strong>${mentee.full_name || "Unknown"}</strong>
                <span>${mentee.email}</span>
            `;
            listDiv.appendChild(card);
        });

        menteesContainer.appendChild(listDiv);
    } catch (err) {
        console.error("Error fetching mentees:", err);
        menteesContainer.innerHTML = `<div class="error">Error loading mentees: ${err.message}</div>`;
    }
});
