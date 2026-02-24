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

    const inputHash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");

    if (inputHash === user.passwordHash) {

        const sessionToken = crypto.randomBytes(24).toString("hex");

        const expiry = Date.now() + (30 * 60 * 1000); // 30 mins

        return {
            status: 200,
            message: "Login successful",
            token: sessionToken,
            expiresAt: expiry
        };
    }

    return { status: 401, message: "Invalid credentials" };
}

module.exports = { login };
