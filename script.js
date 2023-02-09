const result = document.getElementById("result");
const minus = document.getElementById("counter-minus");
const plus = document.getElementById("counter-plus");
const tablePlus = document.getElementById("tablePlus");
const tableMinus = document.getElementById("tableMinus");
const myTableMinus = document.getElementById("myTableMinus");
let inputWords = [];
const events = [];
const sortColumn = { header: "", direction: 1 };

const setSort = (header) => {
    sortColumn.direction = sortColumn.header === header ? sortColumn.direction * -1 : 1;
    sortColumn.header = header;
    showArrow(header);
    updateUi();
};

const showArrow = (header) => {
    let tableH = Array.from(document.getElementsByTagName("th"));
    tableH.map((th) => {
        th.className = '';
        th.id.toString().includes(header) ? (th.className = th.className + " asc") : (th.className = th.className + " desc");
    });
    console.log(tableH);
};

plus.addEventListener("click", () => {
    const lastCount = events.slice(-1)[0]?.count || 0;
    events.push({
        id: events.length,
        operation: "plus",
        oldCount: lastCount,
        count: lastCount + 1,
        timestamp: Math.floor(new Date().getTime() / 1000),
    });
    updateUi();
});

minus.addEventListener("click", () => {
    const lastCount = events.slice(-1)[0]?.count || 0;
    events.push({
        id: events.length,
        operation: "minus",
        oldCount: lastCount,
        count: lastCount - 1,
        timestamp: Math.floor(new Date().getTime() / 1000),
    });
    updateUi();
});

const sort = (a, b) => {
    switch (sortColumn.header) {
        case "id":
        case "oldCount":
        case "count":
        case "timestamp": {
            return sortColumn.direction * (a[sortColumn.header] - b[sortColumn.header]);
        }
        case "operation": {
            return sortColumn.direction * (a[sortColumn.header] - b[sortColumn.header]);
        }
    }
};

const filter = (event) => {
    const str = Object.entries(event)
        .map(([key, value]) => (key === "timestamp" ? new Date(event.timestamp * 1000).toLocaleTimeString() : value))
        .join(" ");
    return inputWords.every((input) => str.includes(input));
};

const updateInputArray = () => {
    inputWords = document.getElementById("myInput").value.split(" ");
    updateUi();
};

const updateUi = () => {
    const lastEvent = events.slice(-1)[0];
    result.innerHTML = lastEvent?.count || 0;
    const events_ = events.filter(filter).sort(sort);
    createTable(events_);
};

const createTable = (events_) => {
    const plusEvents = events_.filter((opValue) => opValue.operation == "plus");
    const minusEvents = events_.filter((opValue) => opValue.operation == "minus");

    tablePlus.innerHTML = "";
    for (let index = plusEvents.length - 1; index >= 0; index--) {
        const event = plusEvents[index];
        insertRow(tablePlus, event);
    }
    tableMinus.innerHTML = "";
    for (let index = minusEvents.length - 1; index >= 0; index--) {
        const event = minusEvents[index];
        insertRow(tableMinus, event);
    }
};

const insertRow = (table, event) => {
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
