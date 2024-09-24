const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

let sites = [];
let transporter;

// Initialize nodemailer transporter
function initializeTransporter() {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });
}

// Check site status
async function checkSiteStatus(site) {
  try {
    const response = await axios.get(site.url);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    return false;
  }
}

// Send email notification
async function sendNotification(site) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: site.ownerEmail,
    subject: `Site Down Alert: ${site.url}`,
    text: `Your site ${site.url} is currently down. Please check and take necessary action.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${site.ownerEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Monitor sites
function monitorSites() {
  sites.forEach(async (site) => {
    const isUp = await checkSiteStatus(site);
    site.status = isUp ? 'up' : 'down';
    if (!isUp && !site.notified) {
      await sendNotification(site);
      site.notified = true;
    } else if (isUp) {
      site.notified = false;
    }
  });
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/add-site', (req, res) => {
  const { url, ownerEmail } = req.body;
  const id = Date.now().toString(); // Generate a unique ID
  sites.push({ id, url, ownerEmail, status: 'unknown', notified: false });
  res.json({ success: true, id });
});

app.get('/sites', (req, res) => {
  res.json(sites);
});

// Updated route for deleting a site
app.delete('/delete-site/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to delete site with id: ${id}`); // Debugging log
  const index = sites.findIndex(site => site.id === id);
  if (index !== -1) {
    sites.splice(index, 1);
    console.log(`Site with id ${id} deleted successfully`); // Debugging log
    res.json({ success: true });
  } else {
    console.log(`Site with id ${id} not found`); // Debugging log
    res.status(404).json({ success: false, message: 'Site not found' });
  }
});

// Start server and monitoring
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  initializeTransporter();
  setInterval(monitorSites, 60000); // Check every minute
});