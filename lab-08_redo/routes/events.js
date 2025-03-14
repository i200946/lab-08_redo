const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { events } = require('../config/config');

const router = express.Router();

router.post('/', authenticate, (req, res) => {
    const { name, description, date, time, category, reminderMinutes } = req.body;
    const event = { id: events.length + 1, name, description, date, time, category, user: req.user };
    events.push(event);
    if (reminderMinutes) {
        const eventTime = new Date(`${date}T${time}`);
        const reminderTime = eventTime.getTime() - reminderMinutes * 60000;
        const delay = reminderTime - Date.now();
        if (delay > 0) {
            setTimeout(() => {
                console.log(`Reminder: ${name} is happening soon!`);
            }, delay);
        }
    }
    res.json({ message: "Event created", event });
});

router.get('/', authenticate, (req, res) => {
    const userEvents = events.filter(event => event.user === req.user);
    res.json(userEvents);
});

module.exports = router;