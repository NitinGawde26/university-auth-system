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

async function login(username, password) {

    const user = users.find(u => u.username === username);

    if (!user) {
        return { status: 404, message: "User not found" };
    }

    if (user.isLocked === true) {
        return { status: 403, message: "Account locked" };
    }

    const inputHash = crypto.createHash("sha256")
        .update(password)
        .digest("hex");

    if (inputHash === user.passwordHash) {

        user.failedAttempts = 0;

        const sessionToken = crypto.randomBytes(24).toString("hex");

        return {
            status: 200,
            message: "Login successful",
            token: sessionToken
        };
    }

    user.failedAttempts += 1;

    if (user.failedAttempts >= 3) {
        user.isLocked = true;
    }

    return { status: 401, message: "Invalid credentials" };
}
