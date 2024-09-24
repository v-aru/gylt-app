# GYLT: Get Your Life Together

GYLT is an all-in-one personal management tool designed to help you organize and streamline essential aspects of your life. Currently, the app focuses on two key features:

- *Habit Tracker:* Track your daily, weekly, or monthly habits, set goals, and visualize your progress.

- *Subscription Manager:* Manage your subscriptions, get renewal alerts, and prevent unexpected charges.

More features (Health Tracker, To-Do List, Pomodoro Timer, Budget Tracker) are in the pipeline and will be added as bonus features in future updates.

---
## Features

1. *Habit Tracker*
- Create: Add new habits with custom schedules (daily, weekly, monthly).
- Read: View all tracked habits and their completion history.
- Update: Modify or reschedule habits as your priorities change.
- Delete: Remove habits that are no longer relevant.
- Calendar Integration: Sync habits with your Google Calendar for reminders.

2. *Subscription Manager*
- Create: Add subscriptions (e.g., Netflix, Spotify) with renewal dates and costs.
- Read: View a list of active subscriptions along with renewal dates and payment history.
- Update: Modify subscription details like renewal date or cost.
- Delete: Remove subscriptions that you no longer use.
- Renewal Alerts: Get notified when a subscription is about to renew to avoid surprise charges.

## CRUD Operations

*Habit Tracker*
- Create: User can create new habits by specifying the habit name, schedule (daily/weekly/monthly), start date, and optional reminders.
- Read: Users can view all their habits in a list or calendar format, check progress, and filter habits by completion or schedule.
- Update: Users can edit the habit details, including changing the schedule, reminders, or habit goals.
- Delete: Users can remove a habit from their list when it is no longer needed or relevant.

*Subscription Manager*
- Create: Users can input subscription details such as the name, provider, cost, renewal date, and payment method.
- Read: Users can view an organized list of their subscriptions, including renewal date and past payment history.
- Update: Users can update subscription information (e.g., cost changes, renewal date changes) if they switch plans.
- Delete: Users can delete subscriptions when they cancel or no longer need them.
- Alerts: Automated system sends reminders X days before a renewal to notify the user of upcoming charges.

## User Stories

*Habit Tracker*
- As a user, I want to add a new habit so that I can track my progress over time.
- As a user, I want to view all my habits in a list so I can easily see what I need to do today, this week, or this month.
- As a user, I want to mark a habit as complete so I can track my progress.
- As a user, I want to edit a habit’s schedule so I can change its frequency or reminders if needed.
- As a user, I want to delete a habit that I no longer want to track.
- As a user, I want to sync my habits with Google Calendar so I can receive reminders across platforms.

*Subscription Manager*
- As a user, I want to add a new subscription so that I can keep track of renewal dates and avoid surprise charges.
- As a user, I want to view all my subscriptions in a single list to monitor my expenses.
- As a user, I want to edit subscription details (like renewal dates or costs) so I can update them if my plan changes.
- As a user, I want to delete a subscription when I no longer use the service.
- As a user, I want to get renewal alerts a few days before my subscription renews so I can decide whether to continue.

---
## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/GYLT.git
    ```

2. Navigate to the project directory and install dependencies:
    ```bash
    cd GYLT
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Open the application in your browser:
    ```
    http://localhost:3000
    ```

## Technologies Used
- **React** (Frontend)
- **Next.js** (Backend)
- **Styled Components** (Styling)
- **Google Calendar Integration** (Habit tracking and subscription reminders)

## License
This project is licensed under the MIT License.