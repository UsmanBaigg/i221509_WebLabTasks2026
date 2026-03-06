const quiz = [
{
question: "Capital of France?",
options: ["Paris","London","Rome","Berlin"],
answer: "Paris"
},
{
question: "2 + 2 = ?",
options: ["3","4","5","6"],
answer: "4"
},
{
question: "JS full form?",
options: ["JavaScript","Java","JScript","JS"],
answer: "JavaScript"
},
{
question: "Earth shape?",
options: ["Square","Round","Triangle","Flat"],
answer: "Round"
},
{
question: "HTML stands for?",
options: ["Hyper Text","High Text","Home Tool","Hyperlink"],
answer: "Hyper Text"
}
];

let index = 0;
let userAnswers = [];

function loadQuestion(){

if(index >= quiz.length){
showResult();
return;
}

document.getElementById("question").innerText =
`Q${index+1}: ${quiz[index].question}`;

let optionHTML = "";

quiz[index].options.forEach(opt=>{
optionHTML += `<button onclick="selectAnswer('${opt}')">${opt}</button>`;
});

document.getElementById("options").innerHTML = optionHTML;

updateProgress();
}

function selectAnswer(ans){
userAnswers.push(ans);
index++;
loadQuestion();
}

function updateProgress(){
let percent = (index/quiz.length)*100;
document.getElementById("progress").style.width = percent+"%";
}

function showResult(){

let html = "<h3>Scoreboard</h3>";

html += "<table>";
html += "<tr><th>Question</th><th>Your Answer</th><th>Correct</th><th>Mark</th></tr>";

quiz.forEach((q,i)=>{

let user = userAnswers[i];
let correct = q.answer;

let mark = user === correct ? 1 : 0;

let rowClass = user === correct ? "correct" : "wrong";

html += `<tr class="${rowClass}">
<td>${q.question}</td>
<td>${user}</td>
<td>${correct}</td>
<td>${mark}</td>
</tr>`;
});

html += "</table>";

document.getElementById("quiz-box").style.display="none";
document.getElementById("result").innerHTML = html;
}

loadQuestion();