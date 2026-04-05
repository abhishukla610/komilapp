export interface TaxSlab {
  from: number;
  to: number;
  rate: number;
}

export const NEW_REGIME_SLABS: TaxSlab[] = [
  { from: 0, to: 400000, rate: 0 },
  { from: 400000, to: 800000, rate: 5 },
  { from: 800000, to: 1200000, rate: 10 },
  { from: 1200000, to: 1600000, rate: 15 },
  { from: 1600000, to: 2000000, rate: 20 },
  { from: 2000000, to: 2400000, rate: 25 },
  { from: 2400000, to: Infinity, rate: 30 },
];

export const OLD_REGIME_SLABS_GENERAL: TaxSlab[] = [
  { from: 0, to: 250000, rate: 0 },
  { from: 250000, to: 500000, rate: 5 },
  { from: 500000, to: 1000000, rate: 20 },
  { from: 1000000, to: Infinity, rate: 30 },
];

export const OLD_REGIME_SLABS_SENIOR: TaxSlab[] = [
  { from: 0, to: 300000, rate: 0 },
  { from: 300000, to: 500000, rate: 5 },
  { from: 500000, to: 1000000, rate: 20 },
  { from: 1000000, to: Infinity, rate: 30 },
];

export const OLD_REGIME_SLABS_SUPER_SENIOR: TaxSlab[] = [
  { from: 0, to: 500000, rate: 0 },
  { from: 500000, to: 1000000, rate: 20 },
  { from: 1000000, to: Infinity, rate: 30 },
];

// Standard deduction: Rs 75,000 (new regime), Rs 50,000 (old regime)
export const STANDARD_DEDUCTION_NEW = 75000;
export const STANDARD_DEDUCTION_OLD = 50000;

// Section 87A rebate thresholds
export const REBATE_THRESHOLD_NEW = 1200000;
export const REBATE_THRESHOLD_OLD = 500000;

// Health & Education Cess
export const CESS_RATE = 4;

// Deduction limits
export const SECTION_80C_LIMIT = 150000;
export const SECTION_80D_LIMIT_GENERAL = 25000;
export const SECTION_80D_LIMIT_SENIOR = 50000;

export function calculateTax(income: number, slabs: TaxSlab[]): number {
  let tax = 0;
  for (const slab of slabs) {
    if (income <= slab.from) break;
    const taxableInSlab = Math.min(income, slab.to) - slab.from;
    tax += (taxableInSlab * slab.rate) / 100;
  }
  return tax;
}

export function getSlabBreakdown(
  income: number,
  slabs: TaxSlab[]
): { from: number; to: number; rate: number; taxableAmount: number; tax: number }[] {
  const breakdown: {
    from: number;
    to: number;
    rate: number;
    taxableAmount: number;
    tax: number;
  }[] = [];

  for (const slab of slabs) {
    if (income <= slab.from) break;
    const taxableAmount = Math.min(income, slab.to) - slab.from;
    const tax = (taxableAmount * slab.rate) / 100;
    breakdown.push({
      from: slab.from,
      to: Math.min(slab.to, income),
      rate: slab.rate,
      taxableAmount,
      tax,
    });
  }

  return breakdown;
}

export function getOldRegimeSlabs(ageGroup: string): TaxSlab[] {
  switch (ageGroup) {
    case "senior":
      return OLD_REGIME_SLABS_SENIOR;
    case "super-senior":
      return OLD_REGIME_SLABS_SUPER_SENIOR;
    default:
      return OLD_REGIME_SLABS_GENERAL;
  }
}
