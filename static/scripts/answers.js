let answers = document.createElement("div");
answers.id = "answers";
answers.classList.add("hbox");

document.getElementById("headertext").innerText = polldata.title;

polldata.answers.forEach(a => {
  let answer = document.createElement("div");
  answer.classList.add("vbox");
  answer.classList.add("card");

  let answerImage = document.createElement("img");
  answerImage.src = a.image;
  answer.append(answerImage);

  let answerText = document.createElement("p");
  answerText.innerText = a.answer;
  answer.append(answerText);

  answers.append(answer);
});

let answersStyle = document.createElement("style");
answersStyle.innerText = `
#answers{
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  transition: height 0.5s;
}
`;

answers.append(answersStyle);
document.getElementById("contentspace").append(answers);


/*
#answers .answer{
  overflow: hidden;
  border: 5px solid purple;
  border-radius: 20px;
  margin: 1rem;
}

#answers .answer img{
  width: 18rem;
  height: 18rem;
}

#answers .answer p{
  background: purple;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
*/





/*
function setPoll(polldata){

  // Set Author
  let author = document.getElementById("author");
  author.innerText = "";
  let authorname = document.createElement("p");
  authorname.innerText = polldata.stats.creation.author;
  let date = document.createElement("p");
  date.innerText = polldata.stats.creation.date;
  author.append(authorname);
  author.append(date);

  // Set Hearts
  let hearts = document.getElementById("hearts");
  hearts.innerText = "";
  let numHearts = document.createElement("p");
  numHearts.innerText = polldata.stats.hearts;
  hearts.append(numHearts);

  // Set Comments
  let comments = document.getElementById("comments");
  comments.innerText = "";
  let numComments = document.createElement("p");
  numComments.innerText = polldata.stats.comments;
  comments.append(numComments);
*/
