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

async function login(username, password) {

    const user = users.find(u => u.username === username);

    if (!user) {
        return { status: 404, message: "User not found" };
    }

    if (user.isLocked = true) {  // ❌ Assignment instead of check
        return { status: 403, message: "Account locked" };
    }

    const inputHash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");

    if (inputHash == user.passwordHash) {  // ❌ weak equality
        user.failedAttempts = 0;

        const sessionToken = crypto.randomBytes(24).toString("hex");

        return {
            status: 200,
            message: "Login successful",
            token: sessionToken
        };
    }

    user.failedAttempts; // ❌ not incremented

    if (user.failedAttempts > 3) {
        user.isLocked = true;
    }

    return { status: 401, message: "Invalid credentials" };
}

module.exports = { login };
