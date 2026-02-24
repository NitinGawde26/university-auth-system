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

// 🔴 BUGS:
// 1. Lock logic incorrect
// 2. Failed attempts not incremented properly
// 3. Password comparison flawed
// 4. Session token never expires

let auditLogs = [];

function logEvent(username, event) {
    auditLogs.push({
        user: username,
        event: event,
        timestamp: new Date().toISOString()
    });
}

async function login(username, password) {

    const user = users.find(u => u.username === username);

    if (!user) {
        logEvent(username, "Failed login - user not found");
        return { status: 404, message: "User not found" };
    }

    const inputHash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");

    if (inputHash === user.passwordHash) {

        logEvent(username, "Successful login");

        const sessionToken = crypto.randomBytes(24).toString("hex");

        return {
            status: 200,
            message: "Login successful",
            token: sessionToken
        };
    }

    logEvent(username, "Failed login - wrong password");

    return { status: 401, message: "Invalid credentials" };
}

module.exports = { login };
