"use strict";
let positionInformation = [
    "Your info ",
    "Select plan ",
    "Add-ons",
    "Summary",
];
let information = document.querySelector(".position-information");
let increAndDecre = 0;
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
let names = document.querySelector("#name");
let address = document.querySelector("#address");
let numbers = document.querySelector("#number");
let errorName = document.querySelector(".errorName");
let errorAddress = document.querySelector(".errorAddress");
let errorNumber = document.querySelector(".errorNumber");
let userDetail = [];
let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let isValid = true;
let formSubmission = document.querySelector(".formSubmission") || null;
let monthlyPlan = document.querySelector(".monthly-plan") || null;
const FormValidation = (nameInput, phoneNumberInput, addressInput) => {
    if (!nameInput) {
        if (errorName) {
            errorName.textContent = "Please,Input Name";
        }
        isValid = false;
    }
    else if (nameInput.charAt(0) !== nameInput.charAt(0).toUpperCase()) {
        if (errorName) {
            errorName.textContent = "Please,First Char should be UpperCase";
        }
        isValid = false;
    }
    else {
        errorName && (errorName.textContent = "");
    }
    if (!addressInput) {
        if (errorAddress) {
            errorAddress.textContent = "Please,Input Email";
        }
        isValid = false;
    }
    else if (!emailRegEx.test(addressInput)) {
        if (errorAddress) {
            errorAddress.textContent = "Please,Include @";
        }
        isValid = false;
    }
    else {
        errorAddress && (errorAddress.textContent = "");
    }
    if (!phoneNumberInput) {
        if (errorNumber) {
            errorNumber.textContent = "Please,Input phone Number";
        }
        isValid = false;
    }
    else if (isNaN(phoneNumberInput)) {
        if (errorNumber) {
            errorNumber.textContent = "Please,Input a Number";
        }
        isValid = false;
    }
    else {
        errorNumber && (errorNumber.textContent = "");
    }
    if (isValid) {
        userDetail[0] = {
            name: nameInput,
            phoneNumber: phoneNumberInput,
            address: addressInput,
        };
        formSubmission.style.display = "none";
        monthlyPlan.style.display = "block";
    }
};
function NumberBackGroungMovable(incre) {
    let checkAllList = document.querySelectorAll(".number") ||
        null;
    if (checkAllList) {
        Array.from(checkAllList).forEach((item, index) => {
            const indexValidator = index === incre
                ? (item.style.backgroundColor = "lightGray")
                : (item.style.backgroundColor = "transparent");
            return indexValidator;
        });
    }
}
// let cardContent =
//   (document.querySelectorAll(".card-content") as NodeListOf<HTMLDivElement>) ||
//   null;
let cardComponent = document.querySelectorAll(".cardComponent");
const toggleIconOn = document.querySelector("i.on") || null;
const toggleIconOff = document.querySelector("i.off") || null;
let InputCheckBox = document.querySelectorAll(".sub-border-div .inPut input") || null;
let borderDiv = document.querySelectorAll(".border-div .amount");
let subborderDiv = document.querySelectorAll(".sub-border-div .online h3");
let totalPage = document.querySelector(".totalPage") || null;
let buttons = document.querySelector(".buttons") || null;
class Subscription {
    constructor(cards, toggleIconOn, toggleIconOff, InputCheckBox, borderDiv, subborderDiv) {
        this.plansaver = {
            plan: 0,
            monthly: true,
            yearly: false,
            selected: "",
            amountAndSelected: [],
        };
        this.ParaChangingContent = ["$90/yr", "$120/yr", "$150/yr"];
        this.originalParagraphTexts = ["$9/month", "$12/month", "$15/month"];
        this.yearlyAMount = ["+$10/yr", "$20/yr", "$20/yr"];
        this.arraySaver = [];
        this.cards = cards;
        this.toggleIconOn = toggleIconOn;
        this.toggleIconOff = toggleIconOff;
        this.InputCheckBox = InputCheckBox;
        this.borderDiv = borderDiv;
        this.subborderDiv = subborderDiv;
    }
    ComponentClicking() {
        Array.from(this.cards).forEach((card) => {
            card.addEventListener("click", () => {
                var _a;
                // console.log("crd clicking", card.children[1]);
                let h4 = card.children[1].querySelector("h4");
                let p = card.children[1].querySelector("p") || null;
                const planSelected = h4 === null || h4 === void 0 ? void 0 : h4.textContent;
                const numericValue = (_a = p.textContent) === null || _a === void 0 ? void 0 : _a.replace(/[^0-9]/g, "");
                if (planSelected && numericValue) {
                    this.plansaver.plan = Number(numericValue);
                    this.plansaver.selected = planSelected;
                    this.arraySaver.push(Number(numericValue));
                }
                const yearlyOrMonthlyDetermineContent = document.querySelector(".div-arcade") || null;
                const amount = document.querySelector(".amounts") || null;
                if (yearlyOrMonthlyDetermineContent && amount) {
                    if (this.plansaver.yearly) {
                        yearlyOrMonthlyDetermineContent.textContent = `${planSelected}(Yearly)`;
                        amount.textContent = `${numericValue}/yrs`;
                        console.log(this.plansaver.yearly);
                    }
                    else {
                        yearlyOrMonthlyDetermineContent.textContent = `${planSelected}(Monthly)`;
                        amount.textContent = `${numericValue}/mo`;
                    }
                }
            });
        });
    }
    TogglingOnYearlyPlan() {
        if (this.toggleIconOn.classList.contains("on")) {
            this.toggleIconOff.style.display = "none";
            this.toggleIconOn.classList.remove("on");
            this.plansaver.yearly = true;
            this.plansaver.monthly = false;
        }
    }
    TogglingOnMonthlyPlan() {
        this.toggleIconOff.style.display = "block";
        this.toggleIconOn.classList.add("on");
        this.plansaver.yearly = false;
        this.plansaver.monthly = true;
    }
    getPlanSaver() {
        return this.plansaver;
    }
    changingYearlyPlan() {
        let h6 = document.querySelectorAll(".hiddenH");
        if (this.plansaver.yearly) {
            this.cards.forEach((card, index) => {
                const eachCardParagraph = card.children[1].querySelector("p") || null;
                this.ParaChangingContent.forEach((content, indexContent) => {
                    if (eachCardParagraph && index === indexContent) {
                        eachCardParagraph.textContent = content;
                        h6.forEach((heading) => {
                            heading.textContent = "2 months free";
                            heading.style.paddingTop = "10px";
                            heading.style.paddingBottom = "20px";
                        });
                    }
                });
            });
            this.borderDiv.forEach((amount) => {
                this.yearlyAMount.forEach((changeContent) => {
                    amount.textContent = changeContent;
                });
            });
        }
        else {
            this.cards.forEach((card, index) => {
                const eachCardParagraph = card.children[1].querySelector("p") || null;
                this.ParaChangingContent.forEach((_, indexContent) => {
                    if (eachCardParagraph && index === indexContent) {
                        eachCardParagraph.textContent = this.originalParagraphTexts[index];
                        h6.forEach((heading) => {
                            heading.textContent = "";
                            heading.style.paddingTop = "0px";
                            heading.style.paddingBottom = "0px";
                        });
                    }
                });
            });
        }
    }
    PickUpGamingExperience() {
        this.InputCheckBox.forEach((input, index) => {
            input.addEventListener("change", () => {
                if (input.checked) {
                    subborderDiv.forEach((hElement, indexes) => {
                        borderDiv.forEach((amount, inde) => {
                            var _a, _b;
                            if (index === indexes && index === inde) {
                                const removalNonNuMERICRegEx = /[^0-9]/g;
                                const removalNonNuMERIC = (_a = amount.textContent) === null || _a === void 0 ? void 0 : _a.replace(removalNonNuMERICRegEx, "");
                                (_b = this.plansaver.amountAndSelected) === null || _b === void 0 ? void 0 : _b.push({
                                    amount: Number(removalNonNuMERIC),
                                    service: hElement.textContent,
                                });
                            }
                        });
                    });
                }
            });
        });
    }
    AllDeliverFunc() {
        var _a;
        // console.log(selectcedGame.children);
        let flexCol = document.querySelector(".flex-col") || null;
        console.log(flexCol);
        (_a = this.plansaver.amountAndSelected) === null || _a === void 0 ? void 0 : _a.forEach((listOfPlans) => {
            const selectcedGame = document.createElement("div") || null;
            selectcedGame.classList.add("selectcedGame");
            const innerDivCreated = document.createElement("div") || null;
            const priceDive = document.createElement("div") || null;
            this.arraySaver.push(listOfPlans.amount);
            priceDive.classList.add("price");
            priceDive.textContent = `${listOfPlans.amount}`;
            innerDivCreated.textContent = listOfPlans.service;
            selectcedGame.appendChild(innerDivCreated);
            selectcedGame.appendChild(priceDive);
            flexCol.appendChild(selectcedGame);
        });
        let one = document.querySelector(".one") || null;
        const total = this.arraySaver.reduce((acc, currentValue) => {
            return acc + currentValue;
        }, 0);
        one.textContent = `${total}`;
    }
}
let sub = new Subscription(cardComponent, toggleIconOn, toggleIconOff, InputCheckBox, borderDiv, subborderDiv);
if (toggleIconOn &&
    toggleIconOff &&
    cardComponent &&
    InputCheckBox.length > 0) {
    sub.ComponentClicking();
    console.log(sub.getPlanSaver());
    sub.PickUpGamingExperience();
    toggleIconOff.addEventListener("click", () => {
        sub.TogglingOnYearlyPlan();
        sub.changingYearlyPlan();
    });
    toggleIconOn.addEventListener("click", () => {
        sub.TogglingOnMonthlyPlan();
        sub.changingYearlyPlan();
    });
    let enhnacement = document.querySelector(".enhnacement") || null;
    let nextBTn = document.querySelector(".next");
    nextBTn.addEventListener("click", () => {
        var _a, _b;
        let num = numbers === null || numbers === void 0 ? void 0 : numbers.value.trim();
        FormValidation(names === null || names === void 0 ? void 0 : names.value.trim(), Number(num), address === null || address === void 0 ? void 0 : address.value.trim());
        ++increAndDecre;
        NumberBackGroungMovable(increAndDecre);
        if (sub.plansaver.selected && sub.plansaver.plan) {
            enhnacement.style.display = "block";
            monthlyPlan.style.display = "none";
        }
        if (((_b = (_a = sub === null || sub === void 0 ? void 0 : sub.plansaver) === null || _a === void 0 ? void 0 : _a.amountAndSelected) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            enhnacement.style.display = "none";
            totalPage.style.display = "block";
            sub.AllDeliverFunc();
        }
        if (increAndDecre > 3) {
            let thankss = document.querySelector(".thanks") || null;
            thankss.style.display = "block";
            buttons.style.display = "none";
            totalPage.style.display = "none";
            let motherDiv = document.querySelector(".mother-div") || null;
            motherDiv.style.gap = "10px";
        }
    });
}
else {
    console.error("Missing DOM elements for subscription.");
}
