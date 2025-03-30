"use strict";
let positionInformation = [
    "Your info ",
    "Select plan ",
    "Add-ons",
    "Summary",
];
let information = document.querySelector(".position-information");
let unorderedList = document.createElement("ul");
unorderedList.className = "unordered";
unorderedList.style.listStyleType = "none";
information === null || information === void 0 ? void 0 : information.appendChild(unorderedList);
if (Array.isArray(positionInformation)) {
    positionInformation.map((element, index) => {
        let list = document.createElement("li");
        let numberDiv = document.createElement("div");
        numberDiv.className = "number";
        const checkNumber = numberDiv ? String(index + 1) : "";
        numberDiv.textContent = checkNumber;
        let infoDiv = document.createElement("div");
        let firstsubDiv = document.createElement("div");
        firstsubDiv.className = "step";
        firstsubDiv.textContent = `STEP ${index + 1}`;
        let secondsubDiv = document.createElement("div");
        secondsubDiv.className = "secondsubDiv";
        secondsubDiv.textContent = element.toUpperCase();
        unorderedList === null || unorderedList === void 0 ? void 0 : unorderedList.appendChild(list);
        list.appendChild(numberDiv);
        list.appendChild(infoDiv);
        infoDiv.appendChild(firstsubDiv);
        infoDiv.appendChild(secondsubDiv);
    });
}
