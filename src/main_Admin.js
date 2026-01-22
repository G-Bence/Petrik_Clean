const API_URL = "https://retoolapi.dev/fZp18N/data";

//const container = document.getElementById("messagesColumns");
const statusText = document.getElementById("statusText");
const columnsRow = document.getElementById("columnsRow");

const col_1 = document.getElementById("col_1");
const col_2 = document.getElementById("col_2");
const col_3 = document.getElementById("col_3");

let firstRun = false

window.addEventListener("resize", () => {
    renderMessages(data)
});

document.addEventListener('DOMContentLoaded', () => { firstRun = true })

let data = [];
let lastHash = "";

function getColumnCount() {
    if (window.matchMedia("(min-width: 992px)").matches) {
        columnsRow.style.width = "70%";
        return 3;
    }
    if (window.matchMedia("(min-width: 768px)").matches) {
        columnsRow.style.width = "80%";
        return 2;
    }
    else {
        columnsRow.style.width = "90%"
        return 1;
    }

}


function createMessageCard(messageText) {
    const card = document.createElement("div");
    card.className = "card shadow-sm msg-card";

    const safeMessage = (messageText.message !== "" && messageText.message.trim() !== "") ? messageText.message : "-";

    card.innerHTML = `
      <div class="card-body text-white">
        <div class="fw-semibold mb-1">${messageText.dataItem}</div>
        <div class="mb-3">${safeMessage}</div>

        <div class="small text-light">
          <div><span class="fw-semibold">Building:</span> ${messageText.building}</div>
          <div><span class="fw-semibold">Toilet:</span> ${messageText.toilet}</div>
          <div><span class="fw-semibold">Floor:</span> ${messageText.floor}</div>
        </div>
        <div class="row mt-3 px-2">
            <button type="button" class="btn btn-outline-danger w-100 mx-auto" onclick="deleteMessage(${messageText.id})">Terminated</button>
        </div>
      </div>`;

    return card;
}

async function deleteMessage(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadMessages()
    }

    catch (err) {
        console.error(err);
        alert("Delete failed. Check console / API.");
    }
}

function renderMessages(messages) {
    col_1.innerHTML = "";
    col_2.innerHTML = "";
    col_3.innerHTML = "";

    if (messages.length === 0 || !Array.isArray(messages)) {
        statusText.textContent = "No available messages.";
        return;
    }

    //statusText.textContent = `Showing ${messages.length} message(s).`;

    let count = 0;
    if (firstRun) {
        const interval = setInterval(() => {
            count++;
            statusText.textContent = `Loading ${count} message(s).`;
            if (count === messages.length) {
                clearInterval(interval);
                setTimeout(() => {
                    statusText.style.visibility = "hidden";
                }, 1000);
            }
        }, 120);
    }


    //messages.sort((a, b) => b.id - a.id);

    let columNum = getColumnCount()
    let colArray = [col_1, col_2, col_3].slice(0, columNum);


    messages.forEach((message, i) => {
        colArray[i % columNum].appendChild(createMessageCard(message));
    });
    firstRun = false
}


async function loadMessages() {
    statusText.textContent = "Loading messages...";

    try {
        const response = await fetch(API_URL, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        data = await response.json();
        renderMessages(data);

    } catch (err) {
        console.error(err);
        statusText.textContent = "Failed to load messages";
    }
}


loadMessages();
setInterval(loadMessages, 5000)
