// Funkce pro vytvoření kalendáře
function createCalendar() {
    var currentMonthYear = document.getElementById("current-month-year");
    var calendarTable = document.getElementById("calendar-table");
    var calendarHeader = document.getElementById("calendar-header");
    var calendarBody = document.getElementById("calendar-body");
    var dayDetails = document.getElementById("day-details");

    // Nastavení aktuálního měsíce a roku v nadpisu
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    currentMonthYear.textContent = months[currentMonth] + " " + currentYear;

    // Funkce pro vytvoření kalendáře pro zadaný měsíc a rok
    function createMonthCalendar(year, month) {
        var firstDay = new Date(year, month, 1).getDay();
        if (firstDay === 0) {
            firstDay = 6; // Pokud je první den neděle, nastavíme ho na 6 (pondělí bude mít index 0)
        } else {
            firstDay--; // Odečteme 1 od indexu prvního dne (pondělí bude mít index 0)
        }
        var daysInMonth = new Date(year, month + 1, 0).getDate();

        // Vytvoření hlavičky kalendáře
        calendarHeader.innerHTML = "";
        for (var i = 0; i < 7; i++) {
            var th = document.createElement("th");
            th.innerHTML = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"][i];
            calendarHeader.appendChild(th);
        }

        // Vytvoření dnů v kalendáři
        calendarBody.innerHTML = "";
        var day = 1;
        for (var i = 0; i < 6; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    var cell = document.createElement("td");
                    row.appendChild(cell);
                } else if (day > daysInMonth) {
                    break;
                } else {
                    var cell = document.createElement("td");
                    var dayNumber = document.createElement("span");
                    dayNumber.textContent = day;

                    // Přidání třídy "note-circle", pokud má den poznámku
                    var key = `${month + 1}-${day}`;
                    if (names.hasOwnProperty(key)) {
                        dayNumber.classList.add("note-circle");
                    }

                    dayNumber.addEventListener("click", showDayDetails);
                    cell.appendChild(dayNumber);

                    // Zvýraznění aktuálního dne
                    if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                        cell.classList.add("current-day");
                    }

                    row.appendChild(cell);
                    day++;
                }
            }

            calendarBody.appendChild(row);
        }
    }

    // Volání funkce pro vytvoření kalendáře pro aktuální měsíc a rok
    createMonthCalendar(currentYear, currentMonth);

    // Funkce pro změnu na předchozí měsíc
    function previousMonth() {
        var selectedMonth = currentMonth;
        var selectedYear = currentYear;

        if (selectedMonth === 0) {
            selectedMonth = 11;
            selectedYear--;
        } else {
            selectedMonth--;
        }

        currentMonth = selectedMonth;
        currentYear = selectedYear;
        currentMonthYear.textContent = months[selectedMonth] + " " + selectedYear;

        createMonthCalendar(selectedYear, selectedMonth);
    }

    // Funkce pro změnu na další měsíc
    function nextMonth() {
        var selectedMonth = currentMonth;
        var selectedYear = currentYear;

        if (selectedMonth === 11) {
            selectedMonth = 0;
            selectedYear++;
        } else {
            selectedMonth++;
        }

        currentMonth = selectedMonth;
        currentYear = selectedYear;
        currentMonthYear.textContent = months[selectedMonth] + " " + selectedYear;

        createMonthCalendar(selectedYear, selectedMonth);
    }

    // Funkce pro zobrazení detailů dne
    function showDayDetails() {
        var day = this.textContent;
        var month = currentMonth;

        const key = `${month + 1}-${day}`;

        // Vytvoření vysouvacího okna s informacemi o dni
        if (names[key]) { 
        dayDetails.innerHTML = names[key];
        dayDetails.style.display = "block";
            } else {
                dayDetails.innerHTML = "";
                var dayDetailsElement = document.querySelector("#day-details");
                dayDetailsElement.style.display = "none";
            }
    }

    // Přidání posluchačů událostí na tlačítka
    document.getElementById("prev-button").addEventListener("click", previousMonth);
    document.getElementById("next-button").addEventListener("click", nextMonth);
}

// Pole s názvy měsíců
var months = [
    "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
];

// Volání funkce pro vytvoření kalendáře po načtení stránky
window.addEventListener("DOMContentLoaded", createCalendar);


function getNameForDate(date, names) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const key = `${month}-${day}`;
    return names[key] || "No name found";
}

// Kalendář se jmény
const names = {
    "6-2": "Jarmil",
    "7-3": "Tamara",
    "8-6": "Norbert",
    "9-11": "Bruno",
    "10-12": "Antonie",
};
