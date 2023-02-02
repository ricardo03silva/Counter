window.onload = myFunction;

function myFunction() {
    let result = document.getElementById('result');
    let minus = document.getElementById('counter-minus');
    let plus = document.getElementById('counter-plus');
    let count=0;
    const eventos = [];

    updateCounter();

    function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
    }
      
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function createRecord(operation, oldcount, count, timestamp){
        const record = new Object();
        //insert data on object
        record.operation = operation;
        record.oldValue = oldcount;
        record.newValue = count;
        record.timestamp = timestamp;

        eventos.push(record);
        //str = JSON.stringify(record);
        //console.log(str);
    }


    plus.addEventListener("click",()=>{
        let oldcount = count;
        count++;
        let operation = 'plus';
        timestamp = formatDate(new Date());
        updateCounter();
        createRecord(operation, oldcount, count, timestamp);
    });

    minus.addEventListener("click",()=>{
        let oldcount = count;
        count--;
        let operation = 'minus';
        timestamp = formatDate(new Date());
        updateCounter();
        createRecord(operation, oldcount, count, timestamp);
    });

    function updateCounter(){
        result.innerHTML = count;
    };
    
    function printElem() {

    }
    
    eventos.forEach(printElem);
}