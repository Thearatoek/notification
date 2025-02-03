import { initializeApp } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express from "express";
import cors from "cors";
import serviceAccount from "/Users/toektheara/Documents/notify/kve-app-d25fa-firebase-adminsdk-wfwh3-411a884d81.json.json" assert { type: "json" };

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

// Initialize Firebase Admin with explicit credentials
initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'kve-app-d25fa',
});

app.post("/send", function (req, res) {
    const receivedToken = req.body.fcmToken;

    const message = {
        notification: {
            title: "Notif",
            body: 'This is a Test Notification'
        },
        token: "dJJfW_0PRzOPQSETDmQCp5:APA91bFuSyKbOVbWYeTdNFX7x5cRrC5BR5R96wYE7j6GxFbNvOSarmfz7TwxYV7kZGaT5cORYT64jsjjVvdjzjZ6ui3IpmB_vJ76CT1Pmny-tFyOEXuebPw",
    };

    getMessaging()
        .send(message)
        .then((response) => {
            res.status(200).json({
                message: "Successfully sent message",
                token: receivedToken,
            });
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            res.status(400).send(error);
            console.log("Error sending message:", error);
        });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
