window.onload = myFunction;

function myFunction() {
    let result = document.getElementById('result');
    let minus = document.getElementById('counter-minus');
    let plus = document.getElementById('counter-plus');
    let count=0;

    updateCounter();

    plus.addEventListener("click",()=>{
        count++;
        updateCounter();
    });

    minus.addEventListener("click",()=>{
        count--;
        updateCounter();
    });

    function updateCounter(){
        result.innerHTML = count;
    };
}