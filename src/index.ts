let positionInformation: string[] = [
  "Your info ",
  "Select plan ",
  "Add-ons",
  "Summary",
];

let information = document.querySelector(
  ".position-information"
) as HTMLDivElement;
let increAndDecre: number = 0;
let unorderedList = document.createElement("ul") as HTMLUListElement;
unorderedList.className = "unordered";
unorderedList.style.listStyleType = "none";
information?.appendChild(unorderedList);

if (Array.isArray(positionInformation)) {
  positionInformation.map((element, index) => {
    let list = document.createElement("li") as HTMLLIElement;
    let numberDiv = document.createElement("div") as HTMLDivElement;
    numberDiv.className = "number";

    const checkNumber = numberDiv ? String(index + 1) : "";
    numberDiv.textContent = checkNumber;
    let infoDiv = document.createElement("div") as HTMLDivElement;
    let firstsubDiv = document.createElement("div") as HTMLDivElement;
    firstsubDiv.className = "step";
    firstsubDiv.textContent = `STEP ${index + 1}`;
    let secondsubDiv = document.createElement("div") as HTMLDivElement;
    secondsubDiv.className = "secondsubDiv";
    secondsubDiv.textContent = element.toUpperCase();
    unorderedList?.appendChild(list);
    list.appendChild(numberDiv);
    list.appendChild(infoDiv);
    infoDiv.appendChild(firstsubDiv);
    infoDiv.appendChild(secondsubDiv);
  });
}

let names = document.querySelector("#name") as HTMLInputElement | null;

let address = document.querySelector("#address") as HTMLInputElement | null;
let numbers = document.querySelector("#number") as HTMLInputElement | null;
let errorName = document.querySelector(
  ".errorName"
) as HTMLParagraphElement | null;
let errorAddress = document.querySelector(
  ".errorAddress"
) as HTMLParagraphElement;
let errorNumber = document.querySelector(
  ".errorNumber"
) as HTMLParagraphElement;

type UserDetail = {
  name: string;
  phoneNumber: number;
  address: string;
};
let userDetail: UserDetail[] = [];

let emailRegEx: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let isValid = true;
let formSubmission =
  (document.querySelector(".formSubmission") as HTMLFormElement) || null;
let monthlyPlan =
  (document.querySelector(".monthly-plan") as HTMLDivElement) || null;

const FormValidation = (
  nameInput: string,
  phoneNumberInput: number,
  addressInput: string
): void => {
  if (!nameInput) {
    if (errorName) {
      errorName.textContent = "Please,Input Name";
    }
    isValid = false;
  } else if (nameInput.charAt(0) !== nameInput.charAt(0).toUpperCase()) {
    if (errorName) {
      errorName.textContent = "Please,First Char should be UpperCase";
    }
    isValid = false;
  } else {
    errorName && (errorName.textContent = "");
  }

  if (!addressInput) {
    if (errorAddress) {
      errorAddress.textContent = "Please,Input Email";
    }
    isValid = false;
  } else if (!emailRegEx.test(addressInput)) {
    if (errorAddress) {
      errorAddress.textContent = "Please,Include @";
    }
    isValid = false;
  } else {
    errorAddress && (errorAddress.textContent = "");
  }

  if (!phoneNumberInput) {
    if (errorNumber) {
      errorNumber.textContent = "Please,Input phone Number";
    }
    isValid = false;
  } else if (isNaN(phoneNumberInput)) {
    if (errorNumber) {
      errorNumber.textContent = "Please,Input a Number";
    }
    isValid = false;
  } else {
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

function NumberBackGroungMovable(incre: number): void {
  let checkAllList =
    (document.querySelectorAll(".number") as NodeListOf<HTMLDivElement>) ||
    null;

  if (checkAllList) {
    Array.from(checkAllList).forEach((item, index) => {
      const indexValidator =
        index === incre
          ? (item.style.backgroundColor = "lightGray")
          : (item.style.backgroundColor = "transparent");
      return indexValidator;
    });
  }
}

// let cardContent =
//   (document.querySelectorAll(".card-content") as NodeListOf<HTMLDivElement>) ||
//   null;
let cardComponent = document.querySelectorAll(
  ".cardComponent"
) as NodeListOf<HTMLDivElement>;
const toggleIconOn = (document.querySelector("i.on") as HTMLElement) || null;
const toggleIconOff = (document.querySelector("i.off") as HTMLElement) || null;
let InputCheckBox =
  (document.querySelectorAll(
    ".sub-border-div .inPut input"
  ) as NodeListOf<HTMLInputElement>) || null;

let borderDiv = document.querySelectorAll(
  ".border-div .amount"
) as NodeListOf<HTMLDivElement>;
let subborderDiv = document.querySelectorAll(
  ".sub-border-div .online h3"
) as NodeListOf<HTMLHeadingElement>;
let totalPage =
  (document.querySelector(".totalPage") as HTMLDivElement) || null;
let buttons = (document.querySelector(".buttons") as HTMLDivElement) || null;

interface Plan {
  ComponentClicking(): void;
  getPlanSaver(): PlanSaver;
  toggleIconOn: HTMLElement;
  toggleIconOff: HTMLElement;
  TogglingOnYearlyPlan(): void;
  TogglingOnMonthlyPlan(): void;
  changingYearlyPlan(): void;
  PickUpGamingExperience(): void;
  InputCheckBox: NodeListOf<HTMLInputElement>;
  borderDiv: NodeListOf<HTMLDivElement>;
  subborderDiv: NodeListOf<HTMLHeadingElement>;
  AllDeliverFunc(): void;
}
type PlanSaver = {
  plan: number;
  monthly?: boolean;
  yearly?: boolean;
  selected?: string;
  amountAndSelected?: { amount?: number; service?: string }[];
};
class Subscription implements Plan {
  cards: NodeListOf<HTMLDivElement>;
  toggleIconOn: HTMLElement;
  toggleIconOff: HTMLElement;
  InputCheckBox: NodeListOf<HTMLInputElement>;
  borderDiv: NodeListOf<HTMLDivElement>;
  subborderDiv: NodeListOf<HTMLHeadingElement>;
  plansaver: PlanSaver = {
    plan: 0,
    monthly: true,
    yearly: false,
    selected: "",
    amountAndSelected: [],
  };
  ParaChangingContent: string[] = ["$90/yr", "$120/yr", "$150/yr"];
  originalParagraphTexts: string[] = ["$9/month", "$12/month", "$15/month"];
  yearlyAMount: string[] = ["+$10/yr", "$20/yr", "$20/yr"];
  arraySaver: number[] = [];

  constructor(
    cards: NodeListOf<HTMLDivElement>,
    toggleIconOn: HTMLElement,
    toggleIconOff: HTMLElement,
    InputCheckBox: NodeListOf<HTMLInputElement>,
    borderDiv: NodeListOf<HTMLDivElement>,
    subborderDiv: NodeListOf<HTMLHeadingElement>
  ) {
    this.cards = cards;
    this.toggleIconOn = toggleIconOn;
    this.toggleIconOff = toggleIconOff;
    this.InputCheckBox = InputCheckBox;
    this.borderDiv = borderDiv;
    this.subborderDiv = subborderDiv;
  }
  ComponentClicking(): void {
    Array.from(this.cards).forEach((card) => {
      card.addEventListener("click", () => {
        // console.log("crd clicking", card.children[1]);
        let h4 = card.children[1].querySelector("h4");
        let p =
          (card.children[1].querySelector("p") as HTMLParagraphElement) || null;
        const planSelected = h4?.textContent;
        const numericValue = p.textContent?.replace(/[^0-9]/g, "");
        if (planSelected && numericValue) {
          this.plansaver.plan = Number(numericValue);
          this.plansaver.selected = planSelected;
          this.arraySaver.push(Number(numericValue));
        }
        const yearlyOrMonthlyDetermineContent =
          (document.querySelector(".div-arcade") as HTMLDivElement) || null;
        const amount =
          (document.querySelector(".amounts") as HTMLDivElement) || null;

        if (yearlyOrMonthlyDetermineContent && amount) {
          if (this.plansaver.yearly) {
            yearlyOrMonthlyDetermineContent.textContent = `${planSelected}(Yearly)`;
            amount.textContent = `${numericValue}/yrs`;
            console.log(this.plansaver.yearly);
          } else {
            yearlyOrMonthlyDetermineContent.textContent = `${planSelected}(Monthly)`;
            amount.textContent = `${numericValue}/mo`;
          }
        }
      });
    });
  }

  TogglingOnYearlyPlan(): void {
    if (this.toggleIconOn.classList.contains("on")) {
      this.toggleIconOff.style.display = "none";
      this.toggleIconOn.classList.remove("on");
      this.plansaver.yearly = true;
      this.plansaver.monthly = false;
    }
  }
  TogglingOnMonthlyPlan(): void {
    this.toggleIconOff.style.display = "block";
    this.toggleIconOn.classList.add("on");
    this.plansaver.yearly = false;
    this.plansaver.monthly = true;
  }
  getPlanSaver(): PlanSaver {
    return this.plansaver;
  }

  changingYearlyPlan(): void {
    let h6 = document.querySelectorAll(
      ".hiddenH"
    ) as NodeListOf<HTMLDivElement>;

    if (this.plansaver.yearly) {
      this.cards.forEach((card, index) => {
        const eachCardParagraph =
          (card.children[1].querySelector("p") as HTMLParagraphElement) || null;

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
    } else {
      this.cards.forEach((card, index) => {
        const eachCardParagraph =
          (card.children[1].querySelector("p") as HTMLParagraphElement) || null;

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

  PickUpGamingExperience(): void {
    this.InputCheckBox.forEach((input, index) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          subborderDiv.forEach((hElement, indexes) => {
            borderDiv.forEach((amount, inde) => {
              if (index === indexes && index === inde) {
                const removalNonNuMERICRegEx = /[^0-9]/g;
                const removalNonNuMERIC = amount.textContent?.replace(
                  removalNonNuMERICRegEx,
                  ""
                );

                this.plansaver.amountAndSelected?.push({
                  amount: Number(removalNonNuMERIC),
                  service: hElement.textContent!,
                });
              }
            });
          });
        }
      });
    });
  }
  AllDeliverFunc(): void {
    // console.log(selectcedGame.children);
    let flexCol =
      (document.querySelector(".flex-col") as HTMLDivElement) || null;
    console.log(flexCol);

    this.plansaver.amountAndSelected?.forEach((listOfPlans) => {
      const selectcedGame =
        (document.createElement("div") as HTMLDivElement) || null;
      selectcedGame.classList.add("selectcedGame");

      const innerDivCreated =
        (document.createElement("div") as HTMLDivElement) || null;

      const priceDive =
        (document.createElement("div") as HTMLDivElement) || null;
      this.arraySaver.push(listOfPlans.amount!);
      priceDive.classList.add("price");
      priceDive.textContent = `${listOfPlans.amount}`;
      innerDivCreated.textContent = listOfPlans.service!;
      selectcedGame.appendChild(innerDivCreated);
      selectcedGame.appendChild(priceDive);
      flexCol.appendChild(selectcedGame);
    });
    let one = (document.querySelector(".one") as HTMLDivElement) || null;
    const total = this.arraySaver.reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0);
    one.textContent = `${total}`;
  }
}

let sub = new Subscription(
  cardComponent,
  toggleIconOn,
  toggleIconOff,
  InputCheckBox,
  borderDiv,
  subborderDiv
);

if (
  toggleIconOn &&
  toggleIconOff &&
  cardComponent &&
  InputCheckBox.length > 0
) {
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
  let enhnacement =
    (document.querySelector(".enhnacement") as HTMLDivElement) || null;

  let nextBTn = document.querySelector(".next") as HTMLButtonElement;

  nextBTn.addEventListener("click", () => {
    let num = numbers?.value.trim();
    FormValidation(names?.value.trim()!, Number(num), address?.value.trim()!);
    ++increAndDecre;
    NumberBackGroungMovable(increAndDecre);
    if (sub.plansaver.selected && sub.plansaver.plan) {
      enhnacement.style.display = "block";
      monthlyPlan.style.display = "none";
    }
    if (sub?.plansaver?.amountAndSelected?.length! > 0) {
      enhnacement.style.display = "none";
      totalPage.style.display = "block";
      sub.AllDeliverFunc();
    }
    if (increAndDecre > 3) {
      let thankss =
        (document.querySelector(".thanks") as HTMLDivElement) || null;
      thankss.style.display = "block";
      buttons.style.display = "none";
      totalPage.style.display = "none";
      let motherDiv =
        (document.querySelector(".mother-div") as HTMLDivElement) || null;
      motherDiv.style.gap = "10px";
    }
  });
} else {
  console.error("Missing DOM elements for subscription.");
}
