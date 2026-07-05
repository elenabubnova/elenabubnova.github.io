let aboutMeData = null;
const chat = document.getElementById("chat");


async function loadAboutMe() {
    const res = await fetch("about_me.json");
    aboutMeData = await res.json();
}
loadAboutMe();


async function sendMessage() {
    const input = document.getElementById("userInput");
    const userMsg = input?.value?.trim();
    if (!userMsg) return;

    const apiKey = window.GEMINI_API_KEY;
    if (!apiKey) {
        addMessage("CatBot", "Chat is unavailable: API key not configured.", "bot");
        return;
    }

    addMessage("You", userMsg, "user");
    input.value = "";
    showThinking();

    if (!aboutMeData) {
        await loadAboutMe();
    }

    const prompt = `Here is some information about Elena:\n${JSON.stringify(aboutMeData)}\n\nBased on this, answer the question: "${userMsg}"`;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey,
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const data = await response.json();
        hideThinking();

        if (!response.ok) {
            console.error("Gemini API error:", data);
            addMessage("CatBot", data.error?.message || "Sorry, I couldn't answer that.", "bot");
            return;
        }

        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text
            || "Sorry, I couldn't answer that.";
        addMessage("CatBot", botReply, "bot");
    } catch (error) {
        hideThinking();
        console.error("Chat request failed:", error);
        addMessage("CatBot", "Sorry, the chat service is unavailable right now.", "bot");
    }
}


function showThinking() {
    if (!chat || document.getElementById("chat-thinking")) {
        return;
    }

    const msg = document.createElement("div");
    msg.id = "chat-thinking";
    msg.className = "text-black mb-2.5 chat-thinking";
    msg.innerHTML = `
        <span class="font-bold">CatBot: </span>
        <span class="thinking-dots" aria-label="CatBot is thinking">
            <span></span><span></span><span></span>
        </span>
    `;

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}


function hideThinking() {
    document.getElementById("chat-thinking")?.remove();
}


function addMessage(sender, text, cls) {
    if (!chat) {
        return;
    }

    const msg = document.createElement("div");
    msg.className = cls === "user"
      ? "text-black font-bold mb-1"
      : "text-black mb-2.5";

    const senderEl = document.createElement("span");
    senderEl.className = "font-bold";
    senderEl.textContent = `${sender}: `;

    const textEl = document.createElement("span");
    textEl.textContent = text;

    msg.appendChild(senderEl);
    msg.appendChild(textEl);

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}


function togglePopup() {
    const popup = document.getElementById("chatPopup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}


function showPrepromptsInChat() {
    const preprompts = [
        "What are Elena's hobbies?",
        "What does Elena do for work?",
        "Summarize Elena's background"
    ];

    const container = document.getElementById("preprompts");
    if (!container) {
        return;
    }

    container.innerHTML = "";

    preprompts.forEach(prompt => {
        const btn = document.createElement("button");
        btn.textContent = prompt;
        btn.onclick = () => {
            document.getElementById("userInput").value = prompt;
            sendMessage();
        };
        container.appendChild(btn);
    });
}


window.onload = () => {
    loadAboutMe();
    showPrepromptsInChat();
};

const userInput = document.getElementById("userInput");
if (userInput) {
    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
}
