# Site Uptime Monitor

This is a simple Node.js application that checks if a website is up or down and sends an email notification using Google SMTP if the site is down. It includes a web-based GUI to monitor multiple sites and get email alerts when they go offline.

## Features
- Monitor website or IP uptime status
- Send email notifications when a site goes down
- GUI with animated SVG indicators for status display
- Automatic status checks every minute

## Prerequisites
- Node.js installed on your machine
- A Gmail account with App Passwords enabled

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/E-Aegis-Labs/site-uptime.git
cd site-uptime
```

2. Initialize a new Node.js project:

```bash
npm init -y
```

3. Install the required dependencies:


npm install express body-parser nodemailer axios

4. Create the main application file:

- Create a file named `app.js` and paste the contents from the **Express Site Monitor Application** artifact into it.

5. Set up the GUI:

- Create a directory named `public` in the project root.
- Inside the `public` directory, create a file named `index.html` and paste the contents from the **Site Monitor GUI** artifact into it.

6. Update the email credentials:

- In the `app.js` file, replace `'your-email@gmail.com'` and `'your-app-password'` with your actual Gmail address and app password.
- You can set up an [App Password](https://support.google.com/accounts/answer/185833?hl=en) in your Google account for secure email sending.

7. Run the application:


node app.js
```

8. Open a browser and navigate to `http://localhost:3000` to access the Site Monitor GUI.

## Usage

1. Input the domain names or IP addresses of the websites you want to monitor in the GUI.
2. Provide an email address to receive notifications if any of the sites go down.
3. The status of the monitored sites is displayed with animated SVG indicators.
4. The application will automatically check the status of the sites every minute.
5. If a site goes down, an email notification will be sent to the provided email address.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README file includes all the necessary information for setting up and running the application. Let me know if you'd like to make any adjustments!
