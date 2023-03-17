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

// Track trade in times
var tradeInTimes = 0;
const outSelect1 = document.getElementById("tradeIn1");
// won't allow trade ins once it is selected
outSelect1.addEventListener("change", function() {
    const selectedOption = outSelect1.value;
    if (gameMode.value === "progressive") {
        if (selectedOption != 0) {
            outSelect1.options[1].disabled = true;
            tradeInTimes += 1;
            alert(tradeInTimes);
        } else {
            outSelect1.options[1].disabled = false;
            tradeInTimes -= 1;
            alert(tradeInTimes);
        }
    } else {
        if (selectedOption != 0) {
            outSelect1.options[1].disabled = true;
            outSelect1.options[2].disabled = true;
            outSelect1.options[3].disabled = true;
            outSelect1.options[4].disabled = true;
        } else {
            outSelect1.options[1].disabled = false;
            outSelect1.options[2].disabled = false;
            outSelect1.options[3].disabled = false;
            outSelect1.options[4].disabled = false;
        }
    }
});

// change game mode
const gameMode = document.getElementById("gameMode");

gameMode.addEventListener("change", function() {
    changeTradeIn(outSelect1);
});

function changeTradeIn(outSelect) {
    const selectedOption = gameMode.value;
    // const outSelect = document.getElementById(tradeInID);
    
    // clear the current selection
    outSelect.options.length = 0;

    // Modify options of outSelect based on selectedOption
    if (selectedOption === "progressive") {
        var option1 = document.createElement("option");
        option1.value = 0;
        option1.text = "Let me rethink.";
        outSelect.add(option1);

        var option2 = document.createElement("option");
        option2.value = 50;
        option2.text = "+50";
        outSelect.add(option2);
    } else {
        var option1 = document.createElement("option");
        option1.value = 0;
        option1.text = "Let me rethink.";
        outSelect.add(option1);

        var option2 = document.createElement("option");
        option2.value = 4;
        option2.text = "Infantry, +4";
        outSelect.add(option2);

        var option3 = document.createElement("option");
        option3.value = 6;
        option3.text = "Calvary, +6";
        outSelect.add(option3);

        var option4 = document.createElement("option");
        option4.value = 8;
        option4.text = "Artillery, +8";
        outSelect.add(option4);

        var option4 = document.createElement("option");
        option4.value = 10;
        option4.text = "All Three, +10";
        outSelect.add(option4);
    }
}


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

function displayText1() {
    var inputText = parseInt(document.getElementById("playe1Territory").value);
    inputText = getTerritoryBonus(inputText);
    document.getElementById("player1Reinforcements").textContent = inputText + calc1();
}

function getTerritoryBonus(num) {
    if (num < 12) return 3;
    return Math.floor(num / 3);
}

function calc1() {
    var result = 0;
    var box1 = document.getElementById("player1Aus");
    var box2 = document.getElementById("player1SouthAmerica");
    var box3 = document.getElementById("player1Africa");
    var box4 = document.getElementById("player1Europe");
    var box5 = document.getElementById("player1NorthAmerica");
    var box6 = document.getElementById("player1Asia");
    if (box1.checked) {
        result += parseInt(box1.value);
    }
    if (box2.checked) {
        result += parseInt(box2.value);
    }
    if (box3.checked) {
        result += parseInt(box3.value);
    }
    if (box4.checked) {
        result += parseInt(box4.value);
    }
    if (box5.checked) {
        result += parseInt(box5.value);
    }
    if (box6.checked) {
        result += parseInt(box6.value);
    }
    return result;
}