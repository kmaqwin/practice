export function calculateSIP(monthlyInvestment: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const totalInvested = monthlyInvestment * months;
  let futureValue: number;
  if (monthlyRate === 0) {
    futureValue = totalInvested;
  } else {
    futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }
  const estimatedReturns = futureValue - totalInvested;
  return { totalInvested, estimatedReturns, futureValue };
}

export function calculateSIPYearly(monthlyInvestment: number, annualRate: number, years: number) {
  const rows = [];
  for (let y = 1; y <= years; y++) {
    const { totalInvested, estimatedReturns, futureValue } = calculateSIP(monthlyInvestment, annualRate, y);
    rows.push({ year: y, totalInvested, estimatedReturns, futureValue });
  }
  return rows;
}

/** Real (inflation-adjusted) value of a nominal future amount */
export function inflationAdjust(nominalValue: number, inflationRate: number, years: number) {
  return nominalValue / Math.pow(1 + inflationRate / 100, years);
}

/**
 * Step-Up SIP: monthly investment increases by stepUpRate% every year.
 * Simulates month-by-month contributions compounding to end of period.
 */
export function calculateStepUpSIP(
  monthly: number,
  annualRate: number,
  years: number,
  stepUpRate: number
) {
  const monthlyRate = annualRate / 12 / 100;
  let futureValue = 0;
  let totalInvested = 0;

  for (let year = 1; year <= years; year++) {
    const monthlyAmount = monthly * Math.pow(1 + stepUpRate / 100, year - 1);
    const monthsFromStart = (year - 1) * 12;
    for (let month = 1; month <= 12; month++) {
      const monthsToEnd = years * 12 - (monthsFromStart + month - 1);
      futureValue += monthlyAmount * Math.pow(1 + monthlyRate, monthsToEnd);
      totalInvested += monthlyAmount;
    }
  }

  const estimatedReturns = futureValue - totalInvested;
  return { totalInvested, estimatedReturns, futureValue };
}

export function calculateStepUpSIPYearly(
  monthly: number,
  annualRate: number,
  years: number,
  stepUpRate: number
) {
  const rows = [];
  for (let y = 1; y <= years; y++) {
    const { totalInvested, estimatedReturns, futureValue } = calculateStepUpSIP(
      monthly,
      annualRate,
      y,
      stepUpRate
    );
    rows.push({ year: y, totalInvested, estimatedReturns, futureValue });
  }
  return rows;
}

/**
 * Reverse SIP: given a target corpus, return the monthly SIP needed.
 * P = FV × r / [((1 + r)^n - 1) × (1 + r)]
 */
export function calculateGoalSIP(
  targetCorpus: number,
  annualRate: number,
  years: number
) {
  const monthlyRate = annualRate / 12 / 100;
  const n = years * 12;
  if (monthlyRate === 0) {
    return { monthlySIP: targetCorpus / n, totalInvested: targetCorpus, estimatedReturns: 0 };
  }
  const monthlySIP =
    (targetCorpus * monthlyRate) /
    ((Math.pow(1 + monthlyRate, n) - 1) * (1 + monthlyRate));
  const totalInvested = monthlySIP * n;
  const estimatedReturns = targetCorpus - totalInvested;
  return { monthlySIP, totalInvested, estimatedReturns };
}

export function calculateLumpsum(principal: number, annualRate: number, years: number) {
  const futureValue = principal * Math.pow(1 + annualRate / 100, years);
  const estimatedReturns = futureValue - principal;
  return { totalInvested: principal, estimatedReturns, futureValue };
}

export function calculateFD(principal: number, annualRate: number, years: number, compoundingPerYear = 4) {
  const futureValue = principal * Math.pow(1 + annualRate / (compoundingPerYear * 100), compoundingPerYear * years);
  const interest = futureValue - principal;
  return { principal, interest, futureValue };
}

export function calculateEMI(loanAmount: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  let emi: number;
  if (monthlyRate === 0) {
    emi = loanAmount / months;
  } else {
    emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }
  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;
  return { emi, totalInterest, totalPayment };
}

export function calculateSimpleInterest(principal: number, rate: number, time: number) {
  const interest = (principal * rate * time) / 100;
  return { principal, interest, total: principal + interest };
}

export function calculateCompoundInterest(principal: number, rate: number, time: number, n: number) {
  const total = principal * Math.pow(1 + rate / (n * 100), n * time);
  const interest = total - principal;
  return { principal, interest, total };
}

export function calculateCAGR(initial: number, final: number, years: number) {
  const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
  return { cagr };
}

export function calculatePPF(yearlyDeposit: number, years: number, rate: number = 7.1) {
  let balance = 0;
  for (let y = 1; y <= years; y++) {
    balance = (balance + yearlyDeposit) * (1 + rate / 100);
  }
  const totalInvested = yearlyDeposit * years;
  const interest = balance - totalInvested;
  return { totalInvested, interest, maturityAmount: balance };
}

export function calculatePPFYearly(yearlyDeposit: number, years: number, rate: number = 7.1) {
  const rows = [];
  let balance = 0;
  let totalInvested = 0;
  for (let y = 1; y <= years; y++) {
    totalInvested += yearlyDeposit;
    balance = (balance + yearlyDeposit) * (1 + rate / 100);
    rows.push({ year: y, totalInvested, interest: balance - totalInvested, balance });
  }
  return rows;
}

export function calculateRD(monthlyDeposit: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 12 / 100;
  let balance = 0;
  for (let m = 1; m <= months; m++) {
    balance = (balance + monthlyDeposit) * (1 + monthlyRate);
  }
  const totalInvested = monthlyDeposit * months;
  const interest = balance - totalInvested;
  return { totalInvested, interest, maturityAmount: balance };
}

export function calculateRDYearly(monthlyDeposit: number, annualRate: number, totalMonths: number) {
  const monthlyRate = annualRate / 12 / 100;
  const rows = [];
  let balance = 0;
  let totalInvested = 0;
  const years = Math.ceil(totalMonths / 12);
  for (let y = 1; y <= years; y++) {
    const monthsThisYear = Math.min(12, totalMonths - (y - 1) * 12);
    for (let m = 0; m < monthsThisYear; m++) {
      balance = (balance + monthlyDeposit) * (1 + monthlyRate);
      totalInvested += monthlyDeposit;
    }
    rows.push({ year: y, totalInvested, interest: balance - totalInvested, balance });
  }
  return rows;
}

export function calculateSWPYearly(corpus: number, monthlyWithdrawal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12 / 100;
  let balance = corpus;
  const rows = [];
  for (let y = 1; y <= years; y++) {
    let yearWithdrawal = 0;
    for (let m = 1; m <= 12; m++) {
      if (balance <= 0) break;
      balance = balance * (1 + monthlyRate);
      const withdrawal = Math.min(balance, monthlyWithdrawal);
      balance -= withdrawal;
      yearWithdrawal += withdrawal;
    }
    rows.push({ year: y, withdrawn: yearWithdrawal, remaining: Math.max(0, balance) });
    if (balance <= 0) break;
  }
  return rows;
}

export function calculateNPS(
  monthlyContribution: number,
  currentAge: number,
  retirementAge: number,
  annualRate: number,
  annuityPct: number,
  annuityReturnRate: number
) {
  const years = retirementAge - currentAge;
  const { futureValue, totalInvested } = calculateSIP(monthlyContribution, annualRate, years);
  const lumpSum = futureValue * (1 - annuityPct / 100);
  const annuityCorpus = futureValue * (annuityPct / 100);
  const monthlyPension = (annuityCorpus * annuityReturnRate) / 12 / 100;
  return { totalInvested, totalCorpus: futureValue, lumpSum, annuityCorpus, monthlyPension };
}

export function calculateGratuity(lastSalary: number, yearsOfService: number) {
  const gratuity = (15 * lastSalary * yearsOfService) / 26;
  return { gratuity };
}

function computeOldRegimeTax(income: number): number {
  if (income <= 0) return 0;
  let tax = 0;
  if (income > 1000000) tax = 112500 + (income - 1000000) * 0.30;
  else if (income > 500000) tax = 12500 + (income - 500000) * 0.20;
  else if (income > 250000) tax = (income - 250000) * 0.05;
  if (income <= 500000) tax = 0;
  return Math.round(tax * 1.04);
}

function computeNewRegimeTax(income: number): number {
  if (income <= 0) return 0;
  let tax = 0;
  if (income > 1500000) tax = 150000 + (income - 1500000) * 0.30;
  else if (income > 1200000) tax = 90000 + (income - 1200000) * 0.20;
  else if (income > 900000) tax = 45000 + (income - 900000) * 0.15;
  else if (income > 600000) tax = 15000 + (income - 600000) * 0.10;
  else if (income > 300000) tax = (income - 300000) * 0.05;
  if (income <= 700000) tax = 0;
  return Math.round(tax * 1.04);
}

export function calculateIncomeTax(
  income: number,
  deductions80C: number,
  deduction80D: number,
  hra: number,
  otherDeductions: number
) {
  const standardDeduction = 50000;
  const taxableOld = Math.max(0, income - standardDeduction - Math.min(deductions80C, 150000) - deduction80D - hra - otherDeductions);
  const taxableNew = Math.max(0, income - standardDeduction);
  const oldTax = computeOldRegimeTax(taxableOld);
  const newTax = computeNewRegimeTax(taxableNew);
  return { taxableOld, taxableNew, oldTax, newTax, savings: oldTax - newTax };
}

export function calculateGST(price: number, rate: number, mode: "add" | "remove") {
  if (mode === "add") {
    const gst = (price * rate) / 100;
    const sgst = gst / 2;
    const cgst = gst / 2;
    return { preGST: price, sgst, cgst, totalGST: gst, postGST: price + gst };
  } else {
    const preGST = (price * 100) / (100 + rate);
    const gst = price - preGST;
    const sgst = gst / 2;
    const cgst = gst / 2;
    return { preGST, sgst, cgst, totalGST: gst, postGST: price };
  }
}



