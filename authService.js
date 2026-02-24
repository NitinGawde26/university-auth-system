const crypto = require("crypto");

let users = [
    {
        id: 1,
        username: "student1",
        passwordHash: crypto.createHash("sha256").update("12345").digest("hex"),
        role: "student",
        failedAttempts: 0,
        isLocked: false
    }
];

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> feature-session-expiry
>>>>>>> feature-audit-logging
async function login(username, password) {

    const user = users.find(u => u.username === username);

    if (!user) {
        logEvent(username, "Failed login - user not found");
        return { status: 404, message: "User not found" };
    }

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> feature-session-expiry
>>>>>>> feature-audit-logging
    const inputHash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");

    if (inputHash === user.passwordHash) {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> feature-session-expiry
>>>>>>> feature-audit-logging

        const sessionToken = crypto.randomBytes(24).toString("hex");

        const expiry = Date.now() + (30 * 60 * 1000); // 30 mins

        return {
            status: 200,
            message: "Login successful",
            token: sessionToken,
            expiresAt: expiry
        };
    }

<<<<<<< HEAD
<<<<<<< HEAD
    user.failedAttempts += 1;

    if (user.failedAttempts >= 3) {
        user.isLocked = true;
    }

