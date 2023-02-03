const result = document.getElementById("result");
const minus = document.getElementById("counter-minus");
const plus = document.getElementById("counter-plus");
const tablePlus = document.getElementById("tablePlus");
const tableMinus = document.getElementById("tableMinus");
const events = [];

plus.addEventListener("click", () => {
    const lastCount = events.slice(-1)[0]?.count || 0;
    events.push({ id: events.length, operation: "plus", oldCount: lastCount, count: lastCount + 1, timestamp: Math.floor(new Date().getTime() / 1000) });
    updateUi();
});

minus.addEventListener("click", () => {
    const lastCount = events.slice(-1)[0]?.count;
    events.push({ id: events.length, operation: "minus", oldCount: lastCount, count: lastCount - 1, timestamp: Math.floor(new Date().getTime() / 1000) });
    updateUi();
});

const mySearch = () => {
    let input, filter, table, tr, td, i, ind, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    let e = document.getElementById("filter");
    let value = e.value;

    for (i = 0; i < tr.length; i++) {
        if (value == "Operation") {
            ind = 1;
        } else if (value == "OldValue") {
            ind = 2;
        } else ind = 3;
        td = tr[i].getElementsByTagName("td")[ind];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};

const updateUi = () => {
    const lastEvent = events.slice(-1)[0];
    result.innerHTML = lastEvent?.count || 0;
    createTable();

    /* TO-DO
        - criar 2 tabelas: uma para o mais e outra para o minus
        - estudar sort, map, filter
    */
};

const createTable = () => {
    // Abstrair isto para metodo createTable
    table.innerHTML = "";
    for (let index = events.length - 1; index >= 0; index--) {
        const event = events[index];
        insertRow(event);
    }
};

const insertRow = (event) => {
    const row = table.insertRow(-1);
    const cell0 = row.insertCell(0);
    const cell1 = row.insertCell(1);
    const cell2 = row.insertCell(2);
    const cell3 = row.insertCell(3);
    const cell4 = row.insertCell(4);
    cell0.innerHTML = event.id;
    cell1.innerHTML = event.operation;
    cell2.innerHTML = event.oldCount;
    cell3.innerHTML = event.count;
    cell4.innerHTML = new Date(event.timestamp * 1000).toLocaleTimeString();
};