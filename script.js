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

        // Získání počtu týdnů v měsíci
        var weeksInMonth = Math.ceil((firstDay + daysInMonth) / 7);

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
        for (var i = 0; i < weeksInMonth; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || (day > daysInMonth)) {
                    var cell = document.createElement("td");
                    row.appendChild(cell);
                } else if (day > daysInMonth) {
                    break;
                } else {
                    var cell = document.createElement("td");
                    var dayNumber = document.createElement("span");
                    dayNumber.textContent = day;

                    // Přidání třídy "note-circle", pokud má den poznámku
                    var key = `${day}.${month + 1}.${year}`;
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

    function showDayDetails() {
        var day = this.textContent;
        var month = currentMonth;

        const key = `${day}.${month + 1}.${currentYear}`;

        // Získání poznámek pro daný den
        var note = names[key];

        // Vytvoření vysouvacího okna s informacemi o dni
        var dayDetailsElement = document.querySelector("#day-details");
        dayDetailsElement.innerHTML = "";

        if (Array.isArray(note)) {
            note.forEach(function (n) {
                // Vytvoření div elementu pro poznámku
                var noteDiv = document.createElement("div");
                noteDiv.textContent = n.name;
                dayDetailsElement.appendChild(noteDiv);

                // Vytvoření oddělovací linie
                var hr = document.createElement("hr");
                dayDetailsElement.appendChild(hr);
            });

            dayDetailsElement.style.display = "block";
        } else if (note) {
            // Vytvoření div elementu pro poznámku
            var noteDiv = document.createElement("div");
            noteDiv.textContent = note.name;
            dayDetailsElement.appendChild(noteDiv);

            dayDetailsElement.style.display = "block";
        } else {
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

// Kalendář se jmény
const names = {
    "2.6.2023": {name: "Jarmil"},
    "3.7.2023": {name: "Tamara"},
    "6.8.2023": {name: "Norbert"},
    "11.9.2023": {name: "Bruno"},
    "12.10.2023": {name: "Antonie"},
};
