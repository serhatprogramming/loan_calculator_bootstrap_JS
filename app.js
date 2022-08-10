// submit listener
const form = document.getElementById("loan-form");
form.addEventListener("submit", calculateResults);

// Calculate Results
function calculateResults(e) {
  // Form Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthylyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const TotalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthylyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    TotalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please check your numbers!");
  }

  e.preventDefault();
}

// Show Error
function showError(error) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.innerText = error;

  const card = document.querySelector(".card");
  const title = document.querySelector(".heading");
  card.insertBefore(errorDiv, title);

  setTimeout(clearAlert, 2000);
}

// Clear Alert
function clearAlert() {
  document.querySelector(".alert").remove();
}
