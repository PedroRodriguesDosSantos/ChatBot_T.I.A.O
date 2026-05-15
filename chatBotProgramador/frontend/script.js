const messages = document.getElementById("messages");
const input = document.querySelector("input");
const sendBtn = document.getElementById("sendBtn");
const themeBtn = document.getElementById("themeToggle");

/* =========================
   MENSAGENS
========================= */
/* Função para criar as bolhas de mensagem na tela */
function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type); // 'type' será 'user' ou 'ai'
  div.innerText = text;

  messages.appendChild(div);
  
  // Faz o scroll automático para a última mensagem
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // 1. Adiciona a sua mensagem na tela
  addMessage(text, "user");
  input.value = "";

  try {
    // 2. Envia a mensagem para o servidor Flask
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mensagem: text,
        historico: [] // Por enquanto enviamos o histórico vazio
      })
    });

    const data = await response.json();

    // 3. Adiciona a resposta do TIAO na tela
    if (data.resposta) {
      addMessage(data.resposta, "ai");
    } else {
      addMessage("Erro: " + data.erro, "ai");
    }

  } catch (error) {
    console.error("Erro na requisição:", error);
    addMessage("Ops! O servidor está desligado ou houve um erro de conexão.", "ai");
  }
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