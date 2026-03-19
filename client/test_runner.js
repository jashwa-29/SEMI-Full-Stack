import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const visitorId = "test_visitor_" + Date.now();

let output = [];
function log(msg) {
    console.log(msg);
    output.push(msg);
}

socket.on("connect", () => {
    log("Connected to server: " + socket.id);
    socket.emit("join_chat", visitorId);
    
    setTimeout(() => {
        log("Sending Name: Test User");
        socket.emit("update_visitor_info", { visitorId, name: "Test User" });
    }, 500);
    
    setTimeout(() => {
        log("Sending Phone: 9876543210");
        socket.emit("update_visitor_info", { visitorId, phone: "9876543210" });
    }, 1500);
    
    setTimeout(() => {
        log("Sending Email: alice@example.com");
        socket.emit("update_visitor_info", { visitorId, email: "alice@example.com" });
    }, 2500);

    setTimeout(() => {
        log("Triggering FAQ match: membership");
        socket.emit("send_message", { visitorId, text: "membership", sender: "user", isAdmin: false });
    }, 4000);

    setTimeout(() => {
        log("Requesting live support...");
        socket.emit("send_message", { visitorId, text: "request_live_chat", sender: "user", isAdmin: false });
    }, 6000);

    setTimeout(() => {
        log("Test finished.");
        process.exit(0);
    }, 8000);
});

socket.on("receive_message", (msg) => {
    log(`[Message from ${msg.sender}]: ${msg.text}`);
});

socket.on("bot_typing", (data) => {
    log(`[Typing Indicator]: Bot is ${data.isTyping ? 'typing...' : 'done typing'}`);
});

socket.on("new_quick_replies", (replies) => {
    log(`[Quick Replies]: ` + replies.map(r => r.label).join(", "));
});

socket.on("connect_error", (err) => {
    log("Connection Error: " + err.message);
    process.exit(1);
});
