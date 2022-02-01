

$(function() {
    $("button").click(function () {

        let player1Choice = $(this).attr('id');
        show(player1Choice);

    });
})


function show(player1Choice) {
    // using random number generator
    let randomChoice = Math.random();
    // declaring empty player2 choice to assign a random choice
    let player2Choice='';
    
    // Added Conditional statements to assign a choice to the player2 based on the random number generated
    if (randomChoice<0.45)
        player2Choice='rock';
    else if (randomChoice<0.80)
        player2Choice='paper';
    else
        player2Choice='scissors';


    // Conditions to display the output

    if (player1Choice === player2Choice)
        document.getElementById("output").innerHTML =  "Its a tie! Please Try again";

    else if (player1Choice == "rock") {
        if (player2Choice == "scissors")
            document.getElementById("output").innerHTML =  "Congrats you Won :) Your opponent had scissors" ;
        else
            document.getElementById("output").innerHTML =  "Bad Luck you Lost :( Your opponent had Papers";
    }
    else if (player1Choice == "paper") {
        if (player2Choice == "rock")
            document.getElementById("output").innerHTML =  "Congrats you Won :) Your opponent had rock";
        else
            document.getElementById("output").innerHTML =  "Bad Luck you Lost :( Your opponent had scissors";
    }
    else if (player1Choice == "scissors") {
        if (player2Choice == "paper")
            document.getElementById("output").innerHTML =  "Congrats you Won :) Your opponent had paper";
        else
            document.getElementById("output").innerHTML =  "Bad Luck you Lost :( Your opponent had rock";
    }
}
