/// <reference types="cypress" />

function selectDayFromCurrent(day) {
  let date = new Date();
  date.setDate(date.getDate() + day);

  let futureDay = date.getDate();
  let futureMonth = date.toLocaleString("default", { month: "short" });

  let dateAssert = futureDay + " " + futureMonth + " " + date.getFullYear();
  // let dateAssert = date.getFullYear() + "-" + futureMonth + "-" + futureDay;

  cy.get(".calendar-range")
    .first()
    // .invoke("attr", "ng-reflect-date")
    .then((dateAttribute) => {
      if (!dateAttribute.includes(futureMonth)) {
        cy.get('[aria-label="Move forward to switch to the next month."]')
          .first()
          .click();
        selectDayFromCurrent(day);
      } else {
        cy.get('[type="button"]')
          .not('[disabled="disabled"]')
          .contains(futureDay)
          .click();
      }
    });
  return dateAssert;
}

export class DatepickerPage {
  //   selectCommonDatepickerDateFromToday(dayFromToday) {
  //     cy.contains("nb-card", "Common Datepicker")
  //       .find("input")
  //       .then((input) => {
  //         cy.wrap(input).click();

  //         let dateAssert = selectDayFromCurrent(dayFromToday);

  //         // cy.get("nb-calendar-day-picker").contains("17").click();
  //         cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
  //         cy.wrap(input).should("have.value", dateAssert);
  //       });
  //   }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    // cy.contains("nb-card", "Datepicker With Range")
    //   .find("input")
    //   .then((input) => {
    //     cy.wrap(input).click();

    let dateAssertFirst = selectDayFromCurrent(firstDay);
    let dateAssertSecond = selectDayFromCurrent(secondDay);

    const finalDate = dateAssertFirst + " - " + dateAssertSecond;

    console.log(finalDate);
    // cy.get("nb-calendar-day-picker").contains("17").click();
    // cy.wrap(input).invoke("prop", "value").should("contain", finalDate);
    // cy.wrap(input).should("have.value", finalDate);
  }
}

export const onDatepickerPage = new DatepickerPage();
