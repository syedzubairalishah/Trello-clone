const main = document.querySelector("#main");
const addcardbutton = document.querySelector("#addcard");
// const coloumn = document.querySelectorAll(".coloumn");

let allelementpick = null;

const addtask = (event) => {
    event.preventDefault();

    const currentform = event.target // current form element
    const value = currentform.elements[0].value // value written in form's input
    const parent = currentform.parentElement; // parent of form i.e div.column
    const ticket = createticket(value); // div to be added

    if (!value) return;

    parent.insertBefore(ticket, currentform); // adding new task before the form

    const h3value = parent.children[0].innerText;

    if (!Array.isArray(savedtasks[h3value])) {
        savedtasks[h3value] = [];
    }

    savedtasks[h3value].push(value);

    localStorage.setItem("savedtasks", JSON.stringify(savedtasks));

    currentform.reset(); // clearing form
};

const mycreatecard = (cardTitle) => {
    const mydiv = document.createElement("div");
    const myh3 = document.createElement("h3");
    const myform = document.createElement("form");
    const myinput = document.createElement("input");

    const h3text = document.createTextNode(cardTitle);

    mydiv.setAttribute("class", "coloumn");
    myinput.setAttribute("type", "text");
    myinput.setAttribute("placeholder", "addtask");

    myh3.appendChild(h3text);
    myform.appendChild(myinput);
    mydiv.appendChild(myh3);
    mydiv.appendChild(myform);

    myform.addEventListener("submit", addtask);

    mydiv.addEventListener("dragleave", (event) => event.preventDefault());
    mydiv.addEventListener("dragover", (event) => event.preventDefault());

    mydiv.addEventListener("drop", (event) => {
        event.preventDefault();
        const droponthatelement = event.target;

        if (droponthatelement.className.includes("coloumn")) {
            droponthatelement.appendChild(allelementpick);
        } else if (droponthatelement.className.includes("ticket")) {
            droponthatelement.parentElement.appendChild(allelementpick);
        }
    });

    return mydiv;
};

const createticket = (value) => {
    const ticket = document.createElement("p");
    const elementtext = document.createTextNode(value);

    ticket.setAttribute("draggable", "true");
    ticket.setAttribute("class", "ticket");
    ticket.appendChild(elementtext);

    ticket.addEventListener("dragstart", (event) => {
        allelementpick = event.target;
    });

    return ticket;
};

let savedtasks = JSON.parse(localStorage.getItem("savedtasks")); //fetching savedtasks obj and converting

if (!savedtasks) {
    savedtasks = {};
}

for (const title in savedtasks) {
    const card = mycreatecard(title);
    const arrayoftasks = savedtasks[title];

    for (let i = 0; i < arrayoftasks.length; i++) {
        const p = createticket(arrayoftasks[i]);
        card.insertBefore(p, card.lastElementChild);
    }

    main.insertBefore(card, addcardbutton);
}

addcardbutton.addEventListener("click", () => {
    const cardTitle = prompt("Enter the card name?");

    if (!cardTitle) return;
    const yourdiv = mycreatecard(cardTitle);
    main.insertBefore(yourdiv, addcardbutton);
});


// for (let i=0; i<coloumn.length; i++) {
//     const form = coloumn[i].lastElementChild // selecting every column's form because form is last element
//     form.addEventListener("submit",addtask);
// }