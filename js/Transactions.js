var IP = localStorage.getItem("IP");
let transactions = [];
const transactionContainer = document.querySelector(".transaction-table");
async function fetchData() {
  const email = document.getElementById("Email").value.toLowerCase();
  const filter = encodeURIComponent(
    "resource:org.block.track.net.Doner#" + email
  );
  await fetch(
    "http://" +
      IP +
      ":3000/api/CreateSendMoney?filter=%7B%22where%22%3A%7B%22Doner%22%3A%22" +
      filter +
      "%22%7D%7D"
  )
    .then((res) => res.json())
    .then((data) => (transactions = data));
  displayTransactions();
}
function displayTransactions() {
  transactionContainer.innerHTML = transactions
    .sort((a, b) => a.pledgeId.split("#")[1] - b.pledgeId.split("#")[1])
    .map((transaction) => {
      return `
      <tr>
        <td>${transaction.MId}</td>
        <td>${transaction.Amount}</td>
        <td>${new Date(transaction.timestamp).toLocaleDateString()}</td>
        <td>${transaction.pledgeId.split("#")[1]}</td>
      </tr>
      `;
    })
    .join("");
}
