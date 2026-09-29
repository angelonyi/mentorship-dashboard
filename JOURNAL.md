
# Build with AI — Project Journal

## Project Overview

Build with AI is a dashboard for a six-week mentorship programme. It provides mentees with programme information, class schedules, Google Meet access, and a progress tracker. It also gives the mentor a dashboard for managing the programme and viewing mentees.

## 1. Design Decisions

- Chose forest green and butter yellow as the main brand colours.
- Used information cards to make programme details easy to read.
- Designed separate dashboard experiences for mentors and mentees.
- Made the mentee dashboard responsive so the cards stack neatly on smaller screens.
- Kept the interface simple and focused on the information users need.

## 2. Changes Implemented

### Mentee Dashboard

- Displayed the programme start date, platform, class time, and next class.
- Added a six-week programme progress tracker.
- Added a JOIN LIVE button connected to the class meeting link.
- Centred the JOIN LIVE button on the page.
- Added a subtle red dot on the left side of the button.
- Kept the JOIN LIVE text and arrow grouped in the centre.
- Used a hamburger menu to provide access to the logout option.

### Mentor Dashboard

- Created a mentor area for managing the mentorship programme.
- Displayed programme details, including the next class and class time.
- Enabled the mentor to view the list of mentees.
- Kept the logout option visible while planning a menu redesign.

### Supabase Integration

- Used Supabase for authentication and programme data.
- Connected the dashboard to the classes table.
- Added the Google Meet link to the Week 2 class scheduled for 4 October 2026.

## 3. Decisions Made During Testing

- Kept the programme progress tracker at Week 1 of 6 because the programme has not yet reached Week 2.
- Kept the green JOIN LIVE button and used a subtle red dot rather than a glowing effect.
- Centred the button without changing the surrounding dashboard layout.
- Decided to move the mentor dashboard's logout option into a hamburger menu.

## 4. Testing Completed

- Checked the mentee dashboard in mobile view.
- Confirmed that the information cards stack vertically on a narrow screen.
- Confirmed that the mentee hamburger menu and logout option work.
- Tested the JOIN LIVE button and confirmed that it opens the Google Meet link.
- Confirmed that the mentor dashboard displays the mentee list.
- Previously tested mentor-page access using a mentee account and confirmed that the access restriction worked.

## 5. Next Steps

1. Create the project README.
2. Update the mentor dashboard to place Logout inside a hamburger menu.
3. Test the new mentor menu on desktop and mobile.
4. Review authentication, permissions, and error handling.
5. Complete the project documentation and final testing.

## 6. Lessons Learned

- Small CSS changes can affect the layout in unexpected ways.
- Testing on a narrow screen helps reveal layout issues that may not appear on desktop.
- Connecting a button to a database value is only part of the work; testing the complete user journey is also important.
- Making one change at a time helps identify problems without disturbing features that already work.