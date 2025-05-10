const apiKey = "AIzaSyCBW0Y9lzHYHMxttPoRZHYeEN07XX8rm4M"; // dont forget to put into .env !!!!!!!!!!!!!!!!!!!!!
let aboutMeData = null;
const chat = document.getElementById("chat");


async function loadAboutMe() {
    const res = await fetch("about_me.json");
    aboutMeData = await res.json();
}
loadAboutMe();


async function sendMessage() {
    const input = document.getElementById("userInput");
    const userMsg = input.value;
    if (!userMsg) return;

    addMessage("You", userMsg, "user");
    input.value = "";

    const prompt = `Here is some information about Elena:\n${JSON.stringify(aboutMeData)}\n\nBased on this, answer the question: "${userMsg}"`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer that.";
    addMessage("CatBot", botReply, "bot");
}


function addMessage(sender, text, cls) {
    const msg = document.createElement("div");
    msg.className = cls === "user"
      ? "text-black font-bold mb-1"
      : "text-black mb-2.5";

    // Create bold sender element
    const senderEl = document.createElement("span");
    senderEl.className = "font-bold";
    senderEl.textContent = `${sender}: `;

    // Create regular message text
    const textEl = document.createElement("span");
    textEl.textContent = text;

    // Append both parts
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
        "Where is Elena from?",
        "Summarize Elena's background"
    ];

    const container = document.getElementById("preprompts");
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


document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      sendMessage(); 
    }
  });