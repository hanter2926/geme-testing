let playerName = prompt("Enter your name:");

let questions = [

{
    level: "Level 1 - C Language",

    code:
`#include<stdio.h>

int main() {

    printf("Hello World")

    return 0;
}`,

    answer:
`printf("Hello World");`,

    hint:
`printf line ke end me semicolon lagao`
},

{
    level: "Level 2 - C++ Language",

    code:
`#include<iostream>

using namespace std;

int main() {

    cout<<"Hello";

    return 0
}`,

    answer:
`return 0;`,

    hint:
`return 0 ke end me semicolon missing hai`
},

{
    level: "Level 3 - Python",

    code:
`print("Hello World"`,

    answer:
`)`,

    hint:
`print statement ka bracket close nahi hua`
},

{
    level: "Level 4 - Java",

    code:
`class Main {

    public static void main(String[] args) {

        System.out.println("Hello")

    }
}`,

    answer:
`;`,

    hint:
`println line ke end me semicolon lagao`
},

{
    level: "Level 5 - JavaScript",

    code:
`function test() {

    console.log("Hello")

}`,

    answer:
`;`,

    hint:
`console.log line ke end me semicolon lagao`
}

];



let currentLevel = 0;

let xp = 120;
let coins = 50;
let completed = 1;

let timeLeft = 30;

let wrongAttempts = 0;


function updateProgressBar()
{
    let progress =
    (currentLevel / questions.length) * 100;

    document.getElementById("progressBar").style.width =
    progress + "%";

    document.getElementById("progressText").innerHTML =
    "Progress: " + Math.floor(progress) + "%";
}

function saveScore()
{
    let scores =
    JSON.parse(localStorage.getItem("scores")) || [];

    scores.push({
        name: playerName,
        xp: xp,
        coins: coins
    });

    localStorage.setItem("scores", JSON.stringify(scores));
}


function loadQuestion()
{
    document.querySelector("h2").innerHTML =
    questions[currentLevel].level;

    document.querySelector("pre").innerText =
    questions[currentLevel].code;

    document.getElementById("answer").value = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("hint").innerHTML = "";

    document.getElementById("answer").disabled = false;

    startTimer();
}



function startTimer()
{
    timeLeft = 30;

    document.getElementById("time").innerHTML =
    timeLeft;

    clearInterval(window.timer);

    window.timer = setInterval(function(){

        timeLeft--;

        document.getElementById("time").innerHTML =
        timeLeft;

        if(timeLeft <= 0)
        {
            clearInterval(window.timer);

            document.getElementById("result").innerHTML =
            "⏰ Time Over!";

            document.getElementById("answer").disabled = true;
        }

    },1000);
}



function checkAnswer()
{
    let userAnswer =
    document.getElementById("answer").value;

    let correctAnswer =
    questions[currentLevel].answer;

    if(userAnswer.includes(correctAnswer))
    {
        wrongAttempts = 0;

        clearInterval(window.timer);

        document.getElementById("result").innerHTML =
        "✅ Correct Answer";

        xp += 100;
        coins += 50;
        completed++;

        document.getElementById("xp").innerHTML =
        xp;

        document.getElementById("coins").innerHTML =
        coins;

        document.getElementById("levels").innerHTML =
        completed;

        currentLevel++;

        updateProgressBar();

        if(currentLevel < questions.length)
        {
            setTimeout(function(){

                loadQuestion();

            },1500);
        }
        else
        {
            document.getElementById("progressBar").style.width =
            "100%";

            document.getElementById("progressText").innerHTML =
            "Progress: 100%";

            document.querySelector(".game-box").innerHTML =
            `
            <h1>🏆 GAME COMPLETED</h1>

            <h2>Total XP : ${xp}</h2>

            <h2>Total Coins : ${coins}</h2>

            <button onclick="restartGame()" class="restart-btn">
                🔄 Restart Game
            </button>
            `;
            saveScore();
            showLeaderboard();
        }

    }
    else
    {
        wrongAttempts++;

        document.getElementById("result").innerHTML =
        `❌ Wrong Answer (${wrongAttempts}/3)`;

        if(wrongAttempts >= 3)
        {
            clearInterval(window.timer);

            document.getElementById("result").innerHTML =
            "💀 GAME OVER";

            document.getElementById("answer").disabled = true;
        }
        
    }
}


function showHint()
{
    document.getElementById("hint").innerHTML =
    "💡 Hint: " + questions[currentLevel].hint;
}



function nextLevel()
{
    currentLevel++;

    if(currentLevel < questions.length)
    {
        wrongAttempts = 0;

        loadQuestion();
    }
    else
    {
        document.querySelector(".game-box").innerHTML =
        `
        <h1>🏆 GAME COMPLETED</h1>

        <h2>Total XP : ${xp}</h2>

        <h2>Total Coins : ${coins}</h2>

        <button onclick="restartGame()" class="restart-btn">
            🔄 Restart Game
        </button>
        `;
    }
}

function showLeaderboard()
{
    let scores =
    JSON.parse(localStorage.getItem("scores")) || [];

    scores.sort((a, b) => b.xp - a.xp);

    let html = "<h2>🏆 Leaderboard</h2>";

    scores.forEach((s, index) => {
        html += `
        <p>${index + 1}. ${s.name} - XP: ${s.xp} Coins: ${s.coins}</p>
        `;
    });

    document.querySelector(".game-box").innerHTML += html;
}


function restartGame()
{
    location.reload();
}

saveScore();
showLeaderboard();
updateProgressBar();
loadQuestion();