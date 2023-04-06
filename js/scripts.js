/*!
* Copyright 2023-2024, Ted Zhan, Matt Chan
* Some of the source code are from those links below.
* Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
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
});

var tradeInTimes = 0;
var roundNumber = 1;

var tradeInList = ["player1TradeIn", "player2TradeIn", "player3TradeIn", "player4TradeIn", "player5TradeIn", "player6TradeIn"]; // Matching cards box
var tradeInCheck = [false, false, false, false, false, false];
var playerTradeInTroops = [0, 0, 0, 0, 0, 0];
var playerTroopsList = ["player1Troops", "player2Troops", "player3Troops", "player4Troops", "player5Troops", "player6Troops"];
var playerContinentList = ["player1Continents", "player2Continents", "player3Continents", "player4Continents", "player5Continents", "player6Continents"];
var playerTerritoryList = ["player1Territory", "player2Territory", "player3Territory", "player4Territory", "player5Territory", "player6Territory"];
var playerReinforcementsList = ["player1Reinforcements", "player2Reinforcements", "player3Reinforcements", "player4Reinforcements", "player5Reinforcements", "player6Reinforcements"];
var playerReinforcements = [0, 0, 0, 0, 0, 0];
var playerNameList = ["player1Name", "player2Name", "player3Name", "player4Name", "player5Name", "player6Name"];

// change game mode
const gameMode = document.getElementById("gameMode");

function changeGameMode() {
    const selectedOption = gameMode.value;
    for (var i = 0; i < tradeInList.length; i++) {
        const outSelect = document.getElementById(tradeInList[i]);
    
        // clear the current selection
        outSelect.options.length = 0;

        // Modify options of outSelect based on selectedOption
        if (selectedOption === "progressive") {
            var option1 = document.createElement("option");
            option1.value = 0;
            option1.text = "Let me rethink.";
            outSelect.add(option1);

            var option2 = document.createElement("option");

            if (tradeInTimes == 0) {
                option2.value = 4;
                option2.text = "+" + option2.value;
            }
            if (tradeInTimes == 1) {
                option2.value = 6;
                option2.text = "+" + option2.value;
            }
            if (tradeInTimes == 2) {
                option2.value = 8;
                option2.text = "+" + option2.value;
            }
            if (tradeInTimes == 3) {
                option2.value = 10;
                option2.text = "+" + option2.value;
            }
            if (tradeInTimes == 4) {
                option2.value = 12;
                option2.text = "+" + option2.value;
            }
            if (tradeInTimes >= 5) {
                option2.value = 5 * (tradeInTimes - 2);
                option2.text = "+" + option2.value;
            }
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
}

function displayText() {
    for (var i = 0; i < playerReinforcementsList.length; i++) {
        var currentTerritories = parseInt(document.getElementById(playerTerritoryList[i]).value);
        var inputText = parseInt(document.getElementById(playerTerritoryList[i]).value);
        if (isNaN(inputText)) inputText = 0;
        inputText = getTerritoryBonus(inputText);
        var totalReinforcements = inputText + getContinentBonus(playerContinentList[i]);

        // if a player has no troops or territories, there are no reinforcements for that player.
        if (isNaN(currentTerritories) || currentTerritories == 0) totalReinforcements = 0;
        // var currentTroops = parseInt(document.getElementById(playerTroopsList[i]).value); // not necessary for the game.
        // if (isNaN(currentTroops) || currentTroops == 0) totalReinforcements = 0;
        document.getElementById(playerReinforcementsList[i]).textContent = totalReinforcements;
        setColors(playerReinforcementsList[i]);
        playerReinforcements[i] = totalReinforcements;
    }
}

function setColors(reinforcements) {
    var textLabel = document.getElementById(reinforcements);
    var number = parseInt(textLabel.textContent);
    if (number < 5) {
        textLabel.style.color = "black";
    } else if (number < 7) {
        textLabel.style.color = "green";
    } else if (number < 10) {
        textLabel.style.color = "blue";
    } else if (number < 13) {
        textLabel.style.color = "purple";
    } else {
        textLabel.style.color = "yellow";
    }
}

function getTerritoryBonus(num) {
    if (num < 12) return 3;
    return Math.floor(num / 3);
}

function getContinentBonus(playerContinents) {
    const checkboxes = document.querySelectorAll("input[name=" + playerContinents + "]");

    var result = 0;
    var box1 = checkboxes[0];
    var box2 = checkboxes[1];
    var box3 = checkboxes[2];
    var box4 = checkboxes[3];
    var box5 = checkboxes[4];
    var box6 = checkboxes[5];

    
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

// won't allow trade-ins once it is selected
function lockTradeIn() {
    for (var i = 0; i < tradeInList.length; i++) {
        var outSelect = document.getElementById(tradeInList[i]);
        const selectedOption = outSelect.value;
        if (gameMode.value === "progressive") {
            if (selectedOption != 0) {
                if (!tradeInCheck[i]) {
                    tradeInTimes += 1;
                    tradeInCheck[i] = true;
                    playerTradeInTroops[i] = parseInt(selectedOption);
                    updatePlayerTroops(i, tradeInCheck[i]);
                }
                outSelect.options[1].disabled = true;
            } else {
                if (tradeInCheck[i]) {
                    tradeInTimes -= 1;
                    tradeInCheck[i] = false;
                    updatePlayerTroops(i, tradeInCheck[i]);
                    playerTradeInTroops[i] = 0;
                }
                outSelect.options[1].disabled = false;
            }
        } else {
            if (selectedOption != 0) {
                if (!tradeInCheck[i]) {
                    tradeInCheck[i] = true;
                    playerTradeInTroops[i] = parseInt(selectedOption);
                    updatePlayerTroops(i, tradeInCheck[i]);
                }
                outSelect.options[1].disabled = true;
                outSelect.options[2].disabled = true;
                outSelect.options[3].disabled = true;
                outSelect.options[4].disabled = true;
            } else {
                if (tradeInCheck[i]) {
                    tradeInCheck[i] = false;
                    updatePlayerTroops(i, tradeInCheck[i]);
                    playerTradeInTroops[i] = 0;
                }
                outSelect.options[1].disabled = false;
                outSelect.options[2].disabled = false;
                outSelect.options[3].disabled = false;
                outSelect.options[4].disabled = false;
            }
        }
    }
    refreshProgressiveTradeIn();
}

function updatePlayerTroops(i, tradeInStatus) {
    var inputText = parseInt(document.getElementById(playerTroopsList[i]).value);
    if (isNaN(inputText)) inputText = 0;
    if (tradeInStatus) {
        document.getElementById(playerTroopsList[i]).value = inputText + playerTradeInTroops[i];
    } else {
        document.getElementById(playerTroopsList[i]).value = inputText - playerTradeInTroops[i];
    }
}

function refreshProgressiveTradeIn() {
    if (gameMode.value !== "progressive") return;
    for (var i = 0; i < tradeInCheck.length; i++) {
        var outSelect = document.getElementById(tradeInList[i]);
        if (!tradeInCheck[i]) {
            // need to redo at your turn. otherwise there is a bug.
            if (tradeInTimes == 0) {
                outSelect.options[1].value = 4;
                outSelect.options[1].text = "+4";
            }
            if (tradeInTimes == 1) {
                outSelect.options[1].value = 6;
                outSelect.options[1].text = "+6";
            }
            if (tradeInTimes == 2) {
                outSelect.options[1].value = 8;
                outSelect.options[1].text = "+8";
            }
            if (tradeInTimes == 3) {
                outSelect.options[1].value = 10;
                outSelect.options[1].text = "+10";
            }
            if (tradeInTimes == 4) {
                outSelect.options[1].value = 12;
                outSelect.options[1].text = "+12";
            }
            if (tradeInTimes >= 5) {
                outSelect.options[1].value = 5 * (tradeInTimes - 2);
                outSelect.options[1].text = "+" + outSelect.options[1].value;
            }
        }
    }
}

function nextRound() {
    for (var i = 0; i < playerTroopsList.length; i++) {
        document.getElementById(playerTroopsList[i]).value = parseInt(playerReinforcements[i]) + parseInt(document.getElementById(playerTroopsList[i]).value);
    }
    roundNumber++;
    document.getElementById("roundTracker").textContent = roundNumber;
    playerTradeInTroops = [0, 0, 0, 0, 0, 0];
    tradeInCheck = [false, false, false, false, false, false];
    changeGameMode();
    resetBlitzPlayers();
}

function newGame() {
    roundNumber = 1;
    tradeInTimes = 0;
    document.getElementById("roundTracker").textContent = roundNumber;
    
    tradeInCheck = [false, false, false, false, false, false];
    playerTradeInTroops = [0, 0, 0, 0, 0, 0];

    // clear name boxes, troop, territories, continents
    for (var i = 0; i < playerTroopsList.length; i++) {
        document.getElementById(playerTroopsList[i]).value = NaN;
        uncheckContinents(playerContinentList[i]);
        document.getElementById(playerTerritoryList[i]).value = NaN;
        document.getElementById(playerNameList[i]).value = "";
    }

    playerReinforcements = [0, 0, 0, 0, 0, 0];
    displayText(); // reset reinforcement list
    changeGameMode(); // Reset trade in list

    // clear blitz area
    resetBlitzPlayers();
}

function uncheckContinents(playerContinents) {
    const checkboxes = document.querySelectorAll("input[name=" + playerContinents + "]");

    checkboxes[0].checked = false;
    checkboxes[1].checked = false;
    checkboxes[2].checked = false;
    checkboxes[3].checked = false;
    checkboxes[4].checked = false;
    checkboxes[5].checked = false;
}

function rollDice() {
    return Math.floor(Math.random() * (6 - 1 + 1) ) + 1;
}

function compareNumbersDescending(a, b) {
    return b - a;
}

function resetBlitzPlayers() {
    document.getElementById("attacker").selectedIndex = 0;
    document.getElementById("defender").selectedIndex = 0;
    document.getElementById("attackerTroops").value = NaN;
    document.getElementById("defenderTroops").value = NaN;
    document.getElementById("blitz").disabled = true;
}

function blitz() {
    var attacker = parseInt(document.getElementById("attackerTroops").value);
    if (isNaN(attacker)) return;
    if (attacker == 0) return;
    var defender = parseInt(document.getElementById("defenderTroops").value);
    if (isNaN(defender)) return;
    var result = blitzRoll(attacker, defender);
    document.getElementById("attackerTroops").value = result[0];
    document.getElementById("defenderTroops").value = result[1];

    // update player troops
    var attackerID = document.getElementById("attacker").selectedIndex - 1;
    var defenderID = document.getElementById("defender").selectedIndex - 1;
    document.getElementById(playerTroopsList[attackerID]).value -= attacker - result[0];
    document.getElementById(playerTroopsList[defenderID]).value -= defender - result[1];
}

function blitzRoll(attacker, defender) {
    while(true) {
        if (attacker == 1) return [attacker, defender];
        if (defender == 0) return [attacker, defender];
        if (attacker >= 4 && defender >= 2) {
            var attackerRolls = [rollDice(), rollDice(), rollDice()];
            var defenderRolls = [rollDice(), rollDice()];
            attackerRolls.sort(compareNumbersDescending);
            defenderRolls.sort(compareNumbersDescending);
            if (attackerRolls[0] > defenderRolls[0]) {
                defender--;
            } else {
                attacker--;
            }
            if (attackerRolls[1] > defenderRolls[1]) {
                defender--;
            } else {
                attacker--;
            }
        } else if (attacker == 3 && defender >= 2) {
            var attackerRolls = [rollDice(), rollDice()];
            var defenderRolls = [rollDice(), rollDice()];
            attackerRolls.sort(compareNumbersDescending);
            defenderRolls.sort(compareNumbersDescending);
            if (attackerRolls[0] > defenderRolls[0]) {
                defender--;
            } else {
                attacker--;
            }
            if (attackerRolls[1] > defenderRolls[1]) {
                defender--;
            } else {
                attacker--;
            }
        } else if (attacker == 2 && defender >= 2) {
            var attackerRolls = [rollDice()];
            var defenderRolls = [rollDice(), rollDice()];
            defenderRolls.sort(compareNumbersDescending);
            if (attackerRolls[0] > defenderRolls[0]) {
                defender--;
            } else {
                attacker--;
            }
        } else if (attacker >= 4 && defender == 1) {
            var attackerRolls = [rollDice(), rollDice(), rollDice()];
            var defenderRolls = [rollDice()];
            attackerRolls.sort(compareNumbersDescending);
            if (attackerRolls[0] > defenderRolls[0]) {
                defender--;
            } else {
                attacker--;
            }
        } else if (attacker == 3 && defender == 1) {
            var attackerRolls = [rollDice(), rollDice()];
            var defenderRolls = [rollDice()];
            attackerRolls.sort(compareNumbersDescending);
            if (attackerRolls[0] > defenderRolls[0]) {
                defender--;
            } else {
                attacker--;
            }
        } else if (attacker == 2 && defender == 1) {
            var attackerRolls = [rollDice()];
            var defenderRolls = [rollDice()];
            if (attackerRolls[0] > defenderRolls[0]) {
                defender--;
            } else {
                attacker--;
            }
        }
    }
}

function lockBlitz() {
    var attacker = document.getElementById("attacker").selectedIndex - 1;
    var defender = document.getElementById("defender").selectedIndex - 1;
    var blitzButton = document.getElementById("blitz");
    if (attacker != -1 && defender != -1 && attacker != defender) {
        blitzButton.disabled = false;
    } else {
        blitzButton.disabled = true;
    }
}
