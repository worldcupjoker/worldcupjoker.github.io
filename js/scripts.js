/*!
* Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    const hello = document.getElementById("tedButton");
    hello.addEventListener("click", function() {
        alert("Ted says hi!");
    });

});


// change game mode
const gameMode = document.getElementById("gameMode");
const outSelect = document.getElementById("tradeIn1");

gameMode.addEventListener("change", function() {
    const selectedOption = gameMode.value;

    // clear the current selection
    outSelect.innerHTML=""

    // Modify options of outSelect based on selectedOption
    if (selectedOption === "increase") {
        const option1 = document.createElement("option");
        option1.value = 0;
        option1.text = "";
        outSelect.add(option1);

        const option2 = document.createElement("option");
        option2.value = "";
        option2.text = "+50";
        outSelect.add(option2);
    } else {
        const option1 = document.createElement("option");
        option1.value = 0;
        option1.text = "";
        outSelect.add(option1);

        const option2 = document.createElement("option");
        option2.value = "";
        option2.text = "Infantry";
        outSelect.add(option2);

        const option3 = document.createElement("option");
        option3.value = "";
        option3.text = "Troops";
        outSelect.add(option3);

        const option4 = document.createElement("option");
        option4.value = "";
        option4.text = "Armies";
        outSelect.add(option4);
    }
});


function addToDisplay(value) {
    document.getElementById('display').value += value;
}
    
function calculate() {
    var expression = document.getElementById('display').value;
    var result = eval(expression);
    document.getElementById('display').value = result;
}
    
function clearDisplay() {
    document.getElementById('display').value = '';
}