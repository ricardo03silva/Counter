const result = document.getElementById("result");
const minus = document.getElementById("counter-minus");
const plus = document.getElementById("counter-plus");
const tablePlus = document.getElementById("tablePlus");
const tableMinus = document.getElementById("tableMinus");
const inputField = document.getElementById("myInput");
const events = [];

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

const mySearch = (events_) => {
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
    createTable(mySearch(events));
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
