const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");
const visitorId = "test_visitor_" + Date.now();

socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
    socket.emit("join_chat", visitorId);
    
    // Simulate frontend greeting flow manually to trigger backend logic if needed
    // The backend doesn't automatically send the greeting, the frontend does.
    // The backend responds to update_visitor_info.
    
    setTimeout(() => {
        console.log("Sending message as user: Test User");
        socket.emit("update_visitor_info", { visitorId, name: "Test User" });
    }, 500);
    
    setTimeout(() => {
        console.log("Sending message as user: 9876543210");
        socket.emit("update_visitor_info", { visitorId, phone: "9876543210" });
    }, 1500);
    
    setTimeout(() => {
        console.log("Sending message as user: alice@example.com");
        socket.emit("update_visitor_info", { visitorId, email: "alice@example.com" });
    }, 2500);

    setTimeout(() => {
        console.log("Triggering FAQ match: membership");
        socket.emit("send_message", { visitorId, text: "membership", sender: "user", isAdmin: false });
    }, 4000);

    setTimeout(() => {
        console.log("Requesting live support...");
        socket.emit("send_message", { visitorId, text: "request_live_chat", sender: "user", isAdmin: false });
    }, 6000);

    setTimeout(() => {
        console.log("Test finished.");
        process.exit(0);
    }, 8000);
});

socket.on("receive_message", (msg) => {
    console.log(`[Message from ${msg.sender}]: ${msg.text}`);
});

socket.on("bot_typing", (data) => {
    console.log(`[Typing Indicator]: Bot is ${data.isTyping ? 'typing...' : 'done typing'}`);
});

socket.on("new_quick_replies", (replies) => {
    console.log(`[Quick Replies]:`, replies.map(r => r.label));
});

socket.on("connect_error", (err) => {
    console.error("Connection Error:", err.message);
    process.exit(1);
});
