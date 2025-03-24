let balance = 0;
let income = 0;
let expenses = 0;
let transactions = [];

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");

// Chart.js setup
const ctx = document.getElementById("financeChart").getContext("2d");
let financeChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  },
});

// Function to update chart
function updateChart() {
  financeChart.data.datasets[0].data = [income, expenses];
  financeChart.update();
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (desc === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = { desc, amount, type };
  transactions.push(transaction);

  if (type === "income") {
    income += amount;
  } else {
    expenses += amount;
  }
  balance = income - expenses;

  updateUI();
  updateChart();
}

function updateUI() {
  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${income.toFixed(2)}`;
  expensesEl.textContent = `$${expenses.toFixed(2)}`;

  transactionList.innerHTML = "";
  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${transaction.desc} - <strong>$${transaction.amount.toFixed(
      2
    )}</strong> 
            <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
        `;
    transactionList.appendChild(li);
  });
}

function deleteTransaction(index) {
  const removed = transactions.splice(index, 1)[0];
  if (removed.type === "income") {
    income -= removed.amount;
  } else {
    expenses -= removed.amount;
  }
  balance = income - expenses;

  updateUI();
  updateChart();
}
