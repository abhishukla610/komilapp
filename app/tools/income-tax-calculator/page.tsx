import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { CalculatorLayout } from "@/components/tools/calculator-layout";
import { IncomeTaxCalculator } from "@/components/tools/income-tax-calculator";

export const metadata: Metadata = constructMetadata({
  title: "Free Income Tax Calculator India FY 2025-26 | Old vs New Regime",
  description:
    "Calculate your income tax for FY 2025-26 (AY 2026-27) with our free online income tax calculator India. Compare old vs new tax regime, Section 80C deductions, standard deduction, and find which regime saves you more tax.",
  pathname: "/tools/income-tax-calculator",
});

const faqs = [
  {
    question:
      "What is the difference between the old and new tax regime in India?",
    answer:
      "The new tax regime (default from FY 2023-24) offers lower tax rates with more slabs but does not allow most deductions and exemptions like 80C, 80D, and HRA. The old regime has higher tax rates but allows you to claim deductions under various sections, which can significantly reduce your taxable income if you have substantial investments and expenses qualifying for deductions.",
  },
  {
    question:
      "What is the standard deduction for FY 2025-26?",
    answer:
      "For FY 2025-26, the standard deduction is Rs 75,000 under the new tax regime and Rs 50,000 under the old tax regime. This deduction is available to all salaried individuals and pensioners and is automatically applied to your gross salary before computing taxable income.",
  },
  {
    question:
      "Who is eligible for the Section 87A rebate in FY 2025-26?",
    answer:
      "Under the new tax regime, individuals with taxable income up to Rs 12,00,000 are eligible for a full tax rebate under Section 87A, meaning they pay zero tax. Under the old tax regime, the rebate is available for taxable income up to Rs 5,00,000. The rebate effectively makes income up to these thresholds tax-free after applying applicable deductions.",
  },
  {
    question:
      "What deductions can I claim under Section 80C?",
    answer:
      "Section 80C allows deductions up to Rs 1,50,000 per financial year for investments and expenses including EPF (Employee Provident Fund), PPF (Public Provident Fund), ELSS mutual funds, life insurance premiums, NSC (National Savings Certificate), tax-saving fixed deposits (5-year lock-in), home loan principal repayment, and children's tuition fees. This deduction is only available under the old tax regime.",
  },
  {
    question:
      "How is Health and Education Cess calculated on income tax?",
    answer:
      "Health and Education Cess is charged at 4% on the total income tax payable (after applying rebate under Section 87A, if eligible). It is applied after computing tax under the applicable slabs and subtracting any rebate. For example, if your tax after rebate is Rs 50,000, the cess would be Rs 2,000 (4% of Rs 50,000), making your total tax liability Rs 52,000.",
  },
];

export default function IncomeTaxCalculatorPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorLayout
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Tools", href: "/tools" },
              { label: "Income Tax Calculator", href: "/tools/income-tax-calculator" },
            ]}
          />
        }
        title="Income Tax Calculator India"
        titleAccent="FY 2025-26"
        description="Calculate and compare your income tax under the old and new tax regimes for FY 2025-26 (AY 2026-27). Find out which regime saves you more tax instantly."
        calculator={<IncomeTaxCalculator />}
        faqs={faqs}
      >
        {/* Educational Content */}
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <h2>Understanding Income Tax in India for FY 2025-26</h2>
          <p>
            Income tax in India is a direct tax levied by the Central Government on the income
            earned by individuals, Hindu Undivided Families (HUFs), and other taxpaying entities
            during a financial year. The Income Tax Act, 1961 governs the taxation framework
            in India, and the rates are revised annually through the Union Budget. For
            FY 2025-26 (Assessment Year 2026-27), taxpayers can choose between two tax structures:
            the new tax regime (which is the default) and the old tax regime.
          </p>

          <h3>New Tax Regime vs Old Tax Regime: Key Differences</h3>
          <p>
            The new tax regime, introduced in Budget 2020 and made the default regime from
            FY 2023-24, features lower tax rates spread across more income slabs. Under the
            new regime for FY 2025-26, income up to Rs 4,00,000 is completely tax-free, and
            rates progress from 5% to 30% across seven slabs. The trade-off is that most
            deductions and exemptions available under the old regime, such as Section 80C
            investments, Section 80D health insurance premiums, and HRA exemptions, are not
            permitted.
          </p>
          <p>
            The old tax regime retains the traditional three-slab structure with rates of 5%,
            20%, and 30%, but allows taxpayers to claim a wide range of deductions. For
            individuals below 60 years, income up to Rs 2,50,000 is tax-free. Senior citizens
            aged 60 to 80 enjoy a higher exemption limit of Rs 3,00,000, while super senior
            citizens above 80 benefit from a Rs 5,00,000 exemption threshold.
          </p>

          <h3>Standard Deduction Explained</h3>
          <p>
            The standard deduction is a flat deduction from gross salary income that every
            salaried individual and pensioner can claim without providing any proof of
            expenditure. For FY 2025-26, the standard deduction is Rs 75,000 under the
            new tax regime (increased from Rs 50,000 in Budget 2024) and Rs 50,000 under
            the old tax regime. This deduction reduces your taxable income directly, meaning
            it lowers the amount on which tax is computed.
          </p>

          <h3>Section 80C: Maximising Your Tax Savings</h3>
          <p>
            Section 80C of the Income Tax Act is one of the most widely used provisions for
            tax saving in India. It allows an individual to deduct up to Rs 1,50,000 from
            their gross total income by investing in specified instruments. Popular 80C
            investments include Employee Provident Fund (EPF), Public Provident Fund (PPF),
            Equity Linked Savings Schemes (ELSS) mutual funds, National Savings Certificates
            (NSC), 5-year tax-saving fixed deposits, Sukanya Samriddhi Yojana, and life
            insurance premiums. Additionally, tuition fees for up to two children and home
            loan principal repayment also qualify under this section.
          </p>
          <p>
            It is important to note that Section 80C deductions are only available under
            the old tax regime. Taxpayers opting for the new regime cannot claim these
            benefits. Therefore, if your total 80C investments are substantial, the old
            regime might work out to be more beneficial despite its higher tax rates.
          </p>

          <h3>Section 87A Rebate: Zero Tax on Lower Incomes</h3>
          <p>
            The Section 87A rebate is a significant relief for taxpayers with moderate
            incomes. Under the new tax regime for FY 2025-26, if your total taxable income
            (after standard deduction) does not exceed Rs 12,00,000, you are eligible for
            a full rebate, effectively reducing your tax payable to zero. Under the old
            regime, this rebate threshold is Rs 5,00,000. This means that under the new
            regime, a salaried individual earning up to Rs 12,75,000 (Rs 12,00,000 +
            Rs 75,000 standard deduction) pays zero income tax.
          </p>

          <h3>How Health and Education Cess Works</h3>
          <p>
            The Health and Education Cess is an additional levy of 4% charged on the total
            income tax amount (after applying any rebate). This cess was introduced to fund
            health and education initiatives across India. Unlike surcharge, which only
            applies to high-income earners, the cess is applicable to all taxpayers whose
            tax liability is greater than zero. It is calculated as the last step in the tax
            computation process: first the tax is determined based on slabs, then any
            applicable rebate is subtracted, and finally the 4% cess is added to arrive
            at the total tax payable.
          </p>

          <h3>Which Tax Regime Should You Choose?</h3>
          <p>
            The choice between old and new tax regime depends entirely on the quantum of
            deductions and exemptions you can legitimately claim. As a general guideline,
            the new regime tends to be more beneficial for individuals who have minimal
            investments qualifying for deductions, such as young professionals or those
            who prefer simpler tax compliance. Conversely, the old regime is usually better
            for individuals who fully utilise Section 80C (Rs 1,50,000), claim HRA exemption,
            pay health insurance premiums under Section 80D, and have other eligible deductions.
          </p>
          <p>
            Our calculator above helps you compare both regimes side by side. Simply enter
            your gross income and applicable deductions, and the tool will compute tax under
            both regimes, clearly showing which one results in a lower tax liability. Salaried
            employees can switch between regimes every financial year, while business owners
            can only switch once from the new regime back to the old regime in their lifetime.
          </p>

          <h3>Important Points for FY 2025-26 Tax Filing</h3>
          <ul>
            <li>
              The deadline for filing income tax returns for FY 2025-26 is typically 31st July
              2026 for individuals not requiring audit.
            </li>
            <li>
              Advance tax must be paid in quarterly instalments if your total tax liability
              exceeds Rs 10,000 in a financial year.
            </li>
            <li>
              Employers deduct TDS (Tax Deducted at Source) based on your declared regime
              choice at the beginning of the financial year.
            </li>
            <li>
              You can change your regime choice when filing your ITR, regardless of what was
              declared to your employer during the year.
            </li>
            <li>
              Ensure you keep proper documentation for all deductions claimed under the old
              regime to avoid issues during assessment or scrutiny.
            </li>
          </ul>
        </div>
      </CalculatorLayout>
    </>
  );
}
