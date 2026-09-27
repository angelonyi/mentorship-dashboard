// Get Supabase settings
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_PUBLISHABLE_KEY;

// Create Supabase client
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

// Signup
const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullname
                }
            }
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created successfully! Please check your email to confirm your account.");

        window.location.href = "login.html";
    });
}// Login
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
            return;
        }

        // Check the user's role
        const role = data.user?.app_metadata?.role;

        if (role === "mentor") {
            window.location.href = "mentor.html";
        } else {
            window.location.href = "dashboard.html";
        }
    });
}// Dashboard protection and user information
const welcomeText = document.getElementById("welcome-text");
const logoutButton = document.getElementById("logout-btn");

if (welcomeText) {
    async function loadDashboard() {
        const {
            data: { user }
        } = await supabaseClient.auth.getUser();

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const fullName = user.user_metadata?.full_name || "Mentee";

        welcomeText.textContent = `Welcome, ${fullName}`;
    }

    loadDashboard();
}

// Logout
if (logoutButton) {
    logoutButton.addEventListener("click", async function (event) {
        event.preventDefault();

        await supabaseClient.auth.signOut();

        window.location.href = "login.html";
    });
}