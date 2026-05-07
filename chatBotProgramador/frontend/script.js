const messages = document.getElementById("messages");
const input = document.querySelector("input");
const sendBtn = document.getElementById("sendBtn");
const themeBtn = document.getElementById("themeToggle");

/* =========================
   MENSAGENS
========================= */
function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerText = text;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    addMessage("Resposta da IA: " + text, "ai");
  }, 700);
}

/* eventos */
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

/* =========================
   TEMA CLARO / ESCURO
========================= */
function setTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeBtn.innerText = isLight ? "☀️" : "🌙";
}

/* carregar tema */
setTheme(localStorage.getItem("theme") === "light");

/* toggle */
themeBtn.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");
  setTheme(isLight);
});