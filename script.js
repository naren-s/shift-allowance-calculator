const shiftContainer = document.getElementById("shift-container");
const totalAllowanceDisplay = document.getElementById("total-allowance");
const monthSelect = document.getElementById("month");
const yearInput = document.getElementById("year");
let totalAllowance = 0;

function updateTotalAllowance() {
  totalAllowanceDisplay.textContent = `Total Allowance: ₹${totalAllowance}`;
}

function updateDayHeaders() {
  const daysContainer = document.getElementById("days-container");
  daysContainer.innerHTML = "";

  const selectedMonth = parseInt(monthSelect.value);
  const selectedYear = parseInt(yearInput.value);
  const firstDayOfMonth = dayjs(`${selectedYear}-${selectedMonth + 1}-01`).day();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const dayIndex = (i + firstDayOfMonth) % 7;
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header";
    dayHeader.textContent = daysOfWeek[dayIndex];
    daysContainer.appendChild(dayHeader);
  }
}

function updateCalendar() {
  const selectedMonth = parseInt(monthSelect.value);
  const selectedYear = parseInt(yearInput.value);
  const daysInMonth = dayjs(`${selectedYear}-${selectedMonth + 1}-01`).daysInMonth();

  shiftContainer.innerHTML = "";
  updateDayHeaders();

  for (let day = 1; day <= daysInMonth; day++) {
    createShiftCell(day);
  }
}

function updateShiftCell(cell, shiftName) {
  const selectedShiftElement = cell.querySelector(".selected-shift");
  selectedShiftElement.textContent = shiftName;
}

function createShiftCell(date) {
  const cell = document.createElement("div");
  cell.className = "date-container";
  cell.innerHTML = `
    <span>${date}</span>
    <span class="selected-shift"></span>
    <select class="shift-option" data-amount="0">
      <option value=""></option>
      <option value="150">1st Shift</option>
      <option value="150">2nd Shift</option>
      <option value="500">3rd Shift</option>
    </select>
  `;

  shiftContainer.appendChild(cell);

  const shiftOption = cell.querySelector(".shift-option");
  const selectedShiftElement = cell.querySelector(".selected-shift");

  shiftOption.addEventListener("change", () => {
    const selectedOption = shiftOption.options[shiftOption.selectedIndex];
    const amount = selectedOption.value === "" ? 0 : parseInt(selectedOption.value);

    totalAllowance -= parseInt(shiftOption.getAttribute("data-amount"));
    totalAllowance += amount;

    shiftOption.setAttribute("data-amount", amount);

    updateTotalAllowance();

    if (amount === 0) {
      selectedShiftElement.textContent = "";
    } else {
      const selectedShiftName = selectedOption.textContent;
      selectedShiftElement.textContent = selectedShiftName;
    }

   
  });
}

// Initialize calendar for the current month and year
updateCalendar();
