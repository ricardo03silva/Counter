const result = document.getElementById("result");
const minus = document.getElementById("counter-minus");
const plus = document.getElementById("counter-plus");
const tablePlus = document.getElementById("tablePlus");
const tableMinus = document.getElementById("tableMinus");
const inputField = document.getElementById("myInput");
const myTableMinus = document.getElementById("myTableMinus");
const events = [];
const sortColumn = { header: "id", direction: 1 };

const getHeader = (header) => {
    sortColumn.direction = sortColumn.header === header ? sortColumn.direction * -1 : 1;
    sortColumn.header = header;
    updateUi(sortColumn);
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

const sortId = (events_, direction_) => {
    let sortedID = [];
    sortedID = direction_ === 1 ? events_.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0)) : events_.sort((a, b) => (b.id < a.id ? 1 : b.id > a.id ? -1 : 0));
    return sortedID;
};

const sort = (events_, sortColumn_) => {
    console.log(sortColumn_.header);
    let sortedEvents = sortColumn_.header === "id" ? sortId(events_, sortColumn_.direction) : events_;
    return sortedEvents;
};

const filter = (events_) => {
    const inputs = inputField.value.split(" ");
    const filteredEvents = events_.filter((event) => {
        const str = Object.entries(event)
            .map(([key, value]) => (key === "timestamp" ? new Date(event.timestamp * 1000).toLocaleTimeString() : value))
            .join(" ");
        return inputs.every((input) => str.includes(input));
    });
    return filteredEvents;
};

const updateUi = () => {
    const lastEvent = events.slice(-1)[0];
    result.innerHTML = lastEvent?.count || 0;
    createTable(sort(filter(events), sortColumn));
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
