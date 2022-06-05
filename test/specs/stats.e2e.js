const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");
const statTestData = {
  age: 1,
  weight: 1,
  hight: 1,
};

describe("MathiApp general", () => {
  it("should verify the broswer title", async () => {
    browser.url("");
    browser.maximizeWindow();
    await browser.pause(1000);
    expect(await browser.getTitle()).toEqual("MathiApp");
  });

  it("should verify the page h1", async () => {
    browser.url("");
    browser.maximizeWindow();
    await browser.pause(1000);
    const h1 = await $("h1");
    expect(await h1.getText()).toEqual("Mathias Hazan-Lira");
  });
});

describe("MathiApp Stats", () => {
  it("should minimize and miazimize the stats box", async () => {
    browser.url("");
    browser.maximizeWindow();
    await browser.pause(1000);
    const minBtn = $(".minStat");
    const subForm = $(".subForm");
    await minBtn.click();
    await browser.pause(2000);
    expect(await subForm.isDisplayed()).toEqual(false);
    await minBtn.click();
    await browser.pause(2000);
    expect(await subForm.isDisplayed()).toEqual(true);
  });

  it("should add new stat and verify its added", async () => {
    browser.url("");
    browser.maximizeWindow();
    await browser.pause(1000);
    const age = $("#age");
    const weight = $("#weight");
    const hight = $("#hight");
    const submit = $(".statSubmitBtn");
    const listElsBefore = $$("tbody tr").length;
    await age.setValue(statTestData["age"]);
    await weight.setValue(statTestData["weight"]);
    await hight.setValue(statTestData["hight"]);
    await submit.click();
    await browser.pause(1000);
    const listElsAfter = $$("tbody tr");
    await expect(listElsAfter).toBeElementsArrayOfSize({ gte: 1 });
    const lastChild = $("tbody:last-child td");
    console.log(await lastChild.getText());
    expect(await lastChild.getText()).toEqual(statTestData["age"] + " Month");
  });
});
