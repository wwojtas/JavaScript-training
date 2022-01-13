window.onload = function () {
  ui.init();
  // ui.salaryChange(); // tylko do testow

};

// składki z pensji pracownika
class MonthlyEmployeeIncome {

  grossAmount; //kwota brutto
  accumulatedYearlyIncomeSum; // zakumulowany dochód od początku roku
  //Składka emerytalna - 9,76%
  retirementContribution;
  // Składka rentowa - 1,5%
  pensionContribution;
  // Składka chorobowa - 2,45%
  sicknessContribution;
  // Suma składek na ubezpieczenie społeczne finansowane przez pracownika
  workerSocialContributionsSum;
  // Podstawa wymiaru składki na ubezpieczenie zdrowotne
  baseForHealthContribution;
  // Składka na ubezpieczenie zdrowotne 9 %:
  healthContribution;
  // Zaliczka na podatek
  advanceTax;
  // Składka zdrowotna według stawki 7,75%
  healthAmountToExclude;
  // Kwota netto
  finalWorkerNetMoney;
  // dochód który jest wynikiem pomniejszenia o koszty uzyskania przychodu 250zł
  income;

  calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum) {
    if (!accumulatedYearlyIncomeSum) accumulatedYearlyIncomeSum = 0;

    this.grossAmount = grossAmount;
    this.monthNum = monthNum;
    this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

    //Składka emerytalna - 9,76%
    this.retirementContribution = grossAmount * 0.0976;

    // Składka rentowa - 1,5%
    this.pensionContribution = grossAmount * 0.015;

    // Składka chorobowa - 2,45%
    this.sicknessContribution = grossAmount * 0.0245;

    // Suma składek na ubezpieczenie społeczne finansowane przez pracownika
    this.workerSocialContributionsSum = this.retirementContribution + this.pensionContribution + this.sicknessContribution;

    // Podstawa wymiaru składki na ubezpieczenie zdrowotne
    this.baseForHealthContribution = this.grossAmount - this.workerSocialContributionsSum;

    // Składka na ubezpieczenie zdrowotne 9 %:
    this.healthContribution = this.baseForHealthContribution * 0.09;

    this.income = Math.ceil(this.baseForHealthContribution) - 250;

    // Zaliczka na podatek
    if (accumulatedYearlyIncomeSum < 85528 && this.income + accumulatedYearlyIncomeSum >= 85528) {

      //pierwszy miesiąc gdzie przekroczony jest próg 17% do 85k, 32% ponad 85k
      this.advanceTax = this.income * 0.17;
      const taxAbove85k = ((this.income + accumulatedYearlyIncomeSum) - 85528) * 0.32;

      this.advanceTax += taxAbove85k;
    } else if (this.income + accumulatedYearlyIncomeSum >= 85528) {
      this.advanceTax = this.income * 0.32;
    } else {
      this.advanceTax = (this.income * 0.17) - 43.76;
    }

    // Składka zdrowotna według stawki 7,75%
    this.healthAmountToExclude = this.baseForHealthContribution * 0.0775;

    // ostateczna zaliczka na podatek dochodowy
    this.advanceTax = Math.floor(this.advanceTax - this.healthAmountToExclude);

    // Kwota netto
    this.finalWorkerNetMoney = grossAmount - this.workerSocialContributionsSum - this.healthContribution - this.advanceTax;

  }

}
const monthlyIncome = new MonthlyEmployeeIncome();


// składki płacone przez pracodawcę
class MonthlyEmploerCost {

  grossAmount; // kwota brutto
  monthNum;
  accumulatedYearlyIncomeSum; //zakumulowany dochód od początku roku

  // Składka na ubezpieczenie emerytalne 9,76%
  employerRetirementContribution;

  // Składka na ubezpieczenie rentowe 6,5%
  employerPensionContribution;

  // Składka na ubezpieczenie wypadkowe 1,67%
  employerAccidentInsurance;

  // Składka na Fundusz Pracy 2,45%
  employerWorkFoundContribution;

  // Składka na Fundusz Gwarantowanych Świadczeń Pracowniczych 0,1%
  employerGuaranteedWorkFoundContribution;

  // Suma składek pracodawcy
  employerContributionSum;

  calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum) {
    this.grossAmount = grossAmount;
    this.monthNum = monthNum;
    this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

    // Składka na ubezpieczenie emerytalne 9,76%
    this.employerRetirementContribution = grossAmount * 0.0976;

    // Składka na ubezpieczenie rentowe 6,5%
    this.employerPensionContribution = grossAmount * 0.065;

    // Składka na ubezpieczenie wypadkowe 1,67%
    this.employerAccidentInsurance = grossAmount * 0.0167;

    // Składka na Fundusz Pracy 2,45%
    this.employerWorkFoundContribution = grossAmount * 0.0245;

    // Składka na Fundusz Gwarantowanych Świadczeń Pracowniczych 0,1%
    this.employerGuaranteedWorkFoundContribution = grossAmount * 0.001;;

    // Suma składek pracodawcy
    this.employerContributionSum = this.employerRetirementContribution + this.employerPensionContribution + this.employerAccidentInsurance + this.employerWorkFoundContribution + this.employerGuaranteedWorkFoundContribution;
  }

};

const monthlyEmploerCost = new MonthlyEmploerCost();


class Ui {
  salaryInput;
  salaryGross; //kwota brutto

  init() {
    this.salaryInput = document.getElementById("salary");
    this.salaryInput.addEventListener("input", this.salaryChange);
  }

  salaryChange = (e) => {
    if (e) this.salaryGross = e.target.value;

    // this.salaryGross = 2600; // wartość założona dla testów 

    if (!this.salaryGross || isNaN(this.salaryGross)) this.salaryGross = 0;

    monthlyIncome.calculate(this.salaryGross, 1, 0);
    monthlyEmploerCost.calculate(this.salaryGross, 1, 0);

    this.updateDom();
  }

  updateDom = () => {

    //Składka emerytalna - 9,76%
    this.setValueById("retirementContribution", monthlyIncome.retirementContribution.toFixed(2));

    // Składka rentowa - 1,5%
    this.setValueById("pensionContribution", monthlyIncome.pensionContribution.toFixed(2));

    // Składka chorobowa - 2,45%
    this.setValueById("sicknessContribution", monthlyIncome.sicknessContribution.toFixed(2));

    // Suma składek na ubezpieczenie społeczne finansowane przez pracownika
    this.setValueById("workerSocialContributionsSum", monthlyIncome.workerSocialContributionsSum.toFixed(2));

    // Podstawa wymiaru składki na ubezpieczenie zdrowotne
    this.setValueById("baseForHealthContribution", monthlyIncome.baseForHealthContribution.toFixed(2));

    // Składka na ubezpieczenie zdrowotne 9 %:
    this.setValueById("healthContribution", monthlyIncome.healthContribution.toFixed(2));

    // Zaliczka na podatek
    this.setValueById("advanceTax", monthlyIncome.advanceTax.toFixed(2));

    // Składka zdrowotna według stawki 7,75%
    this.setValueById("healthAmountToExclude", monthlyIncome.healthAmountToExclude.toFixed(2));

    // Kwota netto
    this.setValueById("finalWorkerNetMoney", monthlyIncome.finalWorkerNetMoney.toFixed(2));


    // 
    // Składki pracodawcy
    // 
    // Składka na ubezpieczenie emerytalne 9,76%
    this.setValueById("employerRetirementContribution", monthlyEmploerCost.employerRetirementContribution.toFixed(2));;

    // Składka na ubezpieczenie rentowe 6,5%
    this.setValueById("employerPensionContribution", monthlyEmploerCost.employerPensionContribution.toFixed(2));

    // Składka na ubezpieczenie wypadkowe 1,67%
    this.setValueById("employerAccidentInsurance", monthlyEmploerCost.employerAccidentInsurance.toFixed(2));

    // Składka na Fundusz Pracy 2,45%
    this.setValueById("employerWorkFoundContribution", monthlyEmploerCost.employerWorkFoundContribution.toFixed(2));

    // Składka na Fundusz Gwarantowanych Świadczeń Pracowniczych 0,1%
    this.setValueById("employerGuaranteedWorkFoundContribution", monthlyEmploerCost.employerGuaranteedWorkFoundContribution.toFixed(2));

    // Suma składek pracodawcy
    this.setValueById("employerContributionSum", monthlyEmploerCost.employerContributionSum.toFixed(2));;

  }

  setValueById(id, value) {
    document.getElementById(id).innerHTML = value;
  }
}

const ui = new Ui();