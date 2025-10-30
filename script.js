// Switch between sections
function showSection(id) {
  document.querySelectorAll(".content-section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* ========================
   PAYMENT MANAGEMENT
======================== */
let payments = [];

function addPayment() {
  const name = document.getElementById("pname").value;
  const amount = parseFloat(document.getElementById("pamount").value);
  const type = document.getElementById("ptype").value;
  const date = new Date().toLocaleDateString();

  if (!name || !amount) {
    alert("Please fill all fields!");
    return;
  }

  payments.push({ name, amount, type, date });
  displayPayments();

  // Clear inputs
  document.getElementById("pname").value = "";
  document.getElementById("pamount").value = "";
}

function displayPayments() {
  let totalReceived = 0, totalPaid = 0;
  let rows = "";

  payments.forEach(p => {
    rows += `<tr>
              <td>${p.name}</td>
              <td>₹${p.amount}</td>
              <td>${p.type}</td>
              <td>${p.date}</td>
            </tr>`;
    if (p.type === "Received") totalReceived += p.amount;
    else totalPaid += p.amount;
  });

  document.getElementById("paymentTable").innerHTML = rows;
  document.getElementById("paymentSummary").innerText =
    `Total Received: ₹${totalReceived} | Total Paid: ₹${totalPaid} | Net Balance: ₹${totalReceived - totalPaid}`;
}

/* ========================
   ATTENDANCE TRACKER
======================== */
let attendance = [];
const wagePerDay = 500;

function markAttendance() {
  const name = document.getElementById("aname").value;
  const date = new Date().toLocaleDateString();

  if (!name) {
    alert("Enter worker name!");
    return;
  }

  attendance.push({ name, date, status: "Present" });
  displayAttendance();
  document.getElementById("aname").value = "";
}

function displayAttendance() {
  let rows = "";
  const workDays = {};

  attendance.forEach(a => {
    rows += `<tr>
              <td>${a.name}</td>
              <td>${a.date}</td>
              <td>${a.status}</td>
            </tr>`;
    workDays[a.name] = (workDays[a.name] || 0) + 1;
  });

  document.getElementById("attendanceTable").innerHTML = rows;

  let summary = "Salary Summary:\n";
  for (let worker in workDays) {
    summary += `${worker}: ₹${workDays[worker] * wagePerDay} (${workDays[worker]} days)\n`;
  }
  document.getElementById("salarySummary").innerText = summary;
}

/* ========================
   INVENTORY MANAGEMENT
======================== */
let inventory = [];

function addItem() {
  const name = document.getElementById("iname").value;
  const qty = parseInt(document.getElementById("iqty").value);
  const price = parseFloat(document.getElementById("iprice").value);

  if (!name || !qty || !price) {
    alert("Please fill all fields!");
    return;
  }

  const existing = inventory.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
    existing.price = price; // update latest price
  } else {
    inventory.push({ name, qty, price });
  }

  displayInventory();

  // Clear inputs
  document.getElementById("iname").value = "";
  document.getElementById("iqty").value = "";
  document.getElementById("iprice").value = "";
}

function displayInventory() {
  let rows = "";
  let totalValue = 0;

  inventory.forEach(item => {
    const value = item.qty * item.price;
    totalValue += value;
    const rowClass = item.qty < 10 ? "low-stock" : "";
    rows += `<tr class="${rowClass}">
              <td>${item.name}</td>
              <td>${item.qty}</td>
              <td>₹${item.price}</td>
              <td>₹${value}</td>
            </tr>`;
  });

  document.getElementById("inventoryTable").innerHTML = rows;
  document.getElementById("inventorySummary").innerText = `Total Inventory Value: ₹${totalValue}`;
}
