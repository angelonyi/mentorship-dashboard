
# Build with AI — Mentorship Dashboard

## Overview

Build with AI is a web dashboard built for a six-week mentorship programme. It gives mentees access to programme information, class schedules, Google Meet links, and a progress tracker. It also provides a separate dashboard for the mentor to view mentees and manage programme information.

## The Problem

Mentorship programmes need a simple way to share class information and meeting links with participants. Without a central place for these details, mentees may struggle to find the information they need.

## The Solution

Build with AI brings key mentorship information into one place, with separate experiences for mentors and mentees.

## Features

### For Mentees
- Account registration and login.
- Programme start date and class schedule.
- Google Meet access through the JOIN LIVE button.
- Six-week progress tracker.
- Mobile-friendly dashboard.
- Logout option in the navigation menu.

### For the Mentor
- Secure mentor login.
- Mentor dashboard with programme information.
- Mentee list.
- Class information and meeting links managed through Supabase.

## Technology Used

- **HTML** — page structure.
- **CSS** — layout, styling, and responsive design.
- **JavaScript** — page interactions and application behaviour.
- **Supabase** — authentication and database.
- **GitHub** — source code management.
- **Vercel** — deployment and hosting.

## How It Works

1. Users log in with their accounts.
2. Mentees access their programme dashboard.
3. The dashboard retrieves class information and meeting links from Supabase.
4. Mentees click JOIN LIVE to open the scheduled Google Meet link.
5. The mentor uses the mentor dashboard to view mentees and manage programme information.

## Design Decisions

- Forest green and butter yellow provide the visual identity.
- Information cards organise programme details.
- The layout adapts to smaller screens.
- The JOIN LIVE button is centred, with a subtle red indicator.
- Mentor and mentee experiences are separated by role-based access controls.

## Testing

The following have been tested:
- Mentee dashboard in mobile view.
- Mentee navigation and logout.
- JOIN LIVE button opening the saved Google Meet link.
- Mentor dashboard and mentee list.
- Mentor-page access restriction for mentees.

## Current Status

The main dashboard features are working. The mentor dashboard's hamburger menu redesign and further final checks remain to be completed.

## What I Learned

Building this project involved connecting the user interface to a database, implementing authentication, testing different user roles, and improving the mobile layout. It also showed the importance of making small changes and testing them before moving on.

## Future Improvements

- Complete the mentor hamburger menu.
- Conduct further security and access-control checks.
- Improve error messages and feedback.
- Complete final desktop and mobile testing.

