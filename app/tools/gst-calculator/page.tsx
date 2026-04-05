import { Metadata } from "next";

import { constructMetadata } from "@/lib/seo";
import { CalculatorLayout } from "@/components/tools/calculator-layout";
import { GstCalculator } from "@/components/tools/gst-calculator";

export const metadata: Metadata = constructMetadata({
  title: "Free GST Calculator Online | Calculate GST Instantly",
  description:
    "Free online GST calculator to add or remove GST at 5%, 12%, 18%, and 28% rates. Calculate CGST, SGST, and IGST instantly with our easy-to-use GST calculation tool for India.",
  pathname: "/tools/gst-calculator",
});

const faqs = [
  {
    question: "How do I calculate GST on a product or service?",
    answer:
      "To calculate GST, multiply the taxable amount by the applicable GST rate (5%, 12%, 18%, or 28%) and divide by 100. For example, if the amount is Rs. 10,000 and the GST rate is 18%, the GST amount is Rs. 1,800 and the total becomes Rs. 11,800. Our calculator does this automatically for you.",
  },
  {
    question: "What is the difference between CGST, SGST, and IGST?",
    answer:
      "CGST (Central GST) and SGST (State GST) are levied equally on intrastate transactions, meaning when the buyer and seller are in the same state. IGST (Integrated GST) is levied on interstate transactions, when the buyer and seller are in different states. The total tax amount remains the same; only the distribution changes. For example, if GST is 18%, intrastate transactions attract 9% CGST and 9% SGST, while interstate transactions attract 18% IGST.",
  },
  {
    question: "How do I remove GST from an amount that already includes GST?",
    answer:
      "To remove GST from an inclusive amount, use the formula: Base Amount = GST-Inclusive Amount x 100 / (100 + GST Rate). For instance, if an item costs Rs. 1,180 inclusive of 18% GST, the base amount is 1,180 x 100 / 118 = Rs. 1,000 and the GST component is Rs. 180. Select 'Remove GST from Amount' in our calculator to do this instantly.",
  },
  {
    question: "What are the current GST rates in India?",
    answer:
      "India has a multi-tier GST structure with rates of 0% (essential items like fresh food, healthcare), 5% (household necessities, transport), 12% (processed food, business-class air tickets), 18% (most goods and services including IT services, telecom, financial services), and 28% (luxury goods, automobiles, tobacco). Some items also attract additional cess on top of the 28% rate.",
  },
  {
    question: "Is GST registration mandatory for all businesses in India?",
    answer:
      "GST registration is mandatory for businesses with annual turnover exceeding Rs. 40 lakhs for goods (Rs. 20 lakhs for special category states) and Rs. 20 lakhs for services (Rs. 10 lakhs for special category states). It is also mandatory for interstate suppliers, e-commerce operators, and those liable to pay tax under reverse charge mechanism regardless of turnover.",
  },
];

function EducationalContent() {
  return (
    <>
      <h2>What is GST?</h2>
      <p>
        Goods and Services Tax (GST) is a comprehensive indirect tax that was
        introduced in India on 1 July 2017, replacing multiple cascading taxes
        such as VAT, service tax, central excise duty, and several other state
        and central levies. GST is governed by the GST Council and is levied on
        the supply of goods and services across India. It follows a
        destination-based taxation principle, meaning the tax revenue goes to
        the state where the goods or services are consumed rather than where
        they are produced.
      </p>
      <p>
        The introduction of GST unified India into a single common market,
        simplifying the tax structure for businesses and consumers alike. Under
        the GST regime, every value addition in the supply chain is taxed, and
        businesses can claim input tax credit for taxes paid at earlier stages,
        which eliminates the cascading effect of tax on tax.
      </p>

      <h2>GST Rates in India</h2>
      <p>
        India follows a multi-tier GST rate structure to ensure that essential
        goods remain affordable while luxury items are taxed at higher rates.
        The GST Council, which comprises the Union Finance Minister and state
        finance ministers, reviews and revises these rates periodically.
      </p>
      <ul>
        <li>
          <strong>0% (Nil Rate):</strong> Essential items such as fresh
          vegetables, fruits, milk, eggs, bread, salt, natural honey, fresh
          meat, fish, educational services, and healthcare services are exempt
          from GST to keep them affordable for all citizens.
        </li>
        <li>
          <strong>5% GST:</strong> Applies to household necessities and mass
          consumption items like sugar, tea, edible oils, domestic LPG,
          coal, railway tickets, economy-class air travel, small restaurants,
          and transport services.
        </li>
        <li>
          <strong>12% GST:</strong> Covers processed foods, butter, cheese,
          ghee, fruit juices, mobile phones, sewing machines, business-class
          air tickets, and certain industrial intermediaries.
        </li>
        <li>
          <strong>18% GST:</strong> This is the standard rate applicable to
          most goods and services. It includes IT services, financial
          services, telecom, branded garments, restaurants in hotels,
          cameras, speakers, monitors, and most manufactured goods.
        </li>
        <li>
          <strong>28% GST:</strong> Reserved for luxury and demerit goods
          including automobiles, tobacco products, aerated drinks, cement,
          air conditioners, refrigerators, washing machines, and other
          premium consumer goods. Some items in this bracket also attract
          an additional compensation cess.
        </li>
      </ul>

      <h2>Understanding CGST, SGST, and IGST</h2>
      <p>
        The GST system in India is a dual model where both the Central and
        State governments levy tax simultaneously on every transaction. This
        dual structure results in three types of GST:
      </p>
      <ul>
        <li>
          <strong>CGST (Central Goods and Services Tax):</strong> Collected
          by the Central Government on intrastate sales. For example, if you
          sell goods within Gujarat, the Central Government collects CGST.
        </li>
        <li>
          <strong>SGST (State Goods and Services Tax):</strong> Collected by
          the State Government on intrastate sales. In the same Gujarat
          example, the State Government collects SGST. CGST and SGST are
          always equal in rate — if GST is 18%, both CGST and SGST are 9%
          each.
        </li>
        <li>
          <strong>IGST (Integrated Goods and Services Tax):</strong>{" "}
          Collected by the Central Government on interstate sales and
          imports. If you sell goods from Gujarat to Maharashtra, IGST at
          the full rate (e.g., 18%) is charged. The Central Government then
          distributes the state share to the destination state.
        </li>
      </ul>

      <h2>How to Calculate GST</h2>
      <p>
        Calculating GST is straightforward once you know the taxable amount
        and the applicable rate. There are two common scenarios:
      </p>
      <h3>Adding GST to an Amount (Exclusive Calculation)</h3>
      <p>
        When you know the base price and want to find the GST-inclusive
        amount:
      </p>
      <ul>
        <li>GST Amount = Base Amount x GST Rate / 100</li>
        <li>Total Amount = Base Amount + GST Amount</li>
        <li>
          Example: Base Amount = Rs. 50,000, GST Rate = 18%. GST = 50,000 x
          18/100 = Rs. 9,000. Total = Rs. 59,000.
        </li>
      </ul>
      <h3>Removing GST from an Amount (Inclusive Calculation)</h3>
      <p>
        When you have a GST-inclusive price and want to find the base amount:
      </p>
      <ul>
        <li>Base Amount = Inclusive Amount x 100 / (100 + GST Rate)</li>
        <li>GST Amount = Inclusive Amount - Base Amount</li>
        <li>
          Example: Inclusive Amount = Rs. 59,000, GST Rate = 18%. Base =
          59,000 x 100/118 = Rs. 50,000. GST = Rs. 9,000.
        </li>
      </ul>

      <h2>When Was GST Introduced in India?</h2>
      <p>
        GST was introduced in India on 1 July 2017 through the 101st
        Constitutional Amendment Act. The idea of a unified national goods and
        services tax was first proposed in 2000 by the Atal Bihari Vajpayee
        government. After years of deliberation, consultation, and political
        negotiations, the Constitution Amendment Bill was passed in 2016, and
        the GST Council was formed to decide on rates, rules, and
        implementation.
      </p>
      <p>
        The rollout of GST is considered one of India&apos;s most significant
        tax reforms since independence, bringing uniformity, reducing
        compliance burdens for businesses operating across states, and
        increasing the overall tax base. The GST Network (GSTN) was set up as
        a technology backbone to handle registration, return filing, and tax
        payments digitally.
      </p>
    </>
  );
}

export default function GstCalculatorPage() {
  return (
    <CalculatorLayout
      title="GST Calculator"
      description="Calculate GST instantly. Add or remove GST at 5%, 12%, 18%, or 28% with CGST, SGST, and IGST breakdown."
      breadcrumbLabel="GST Calculator"
      educationalContent={<EducationalContent />}
      faqs={faqs}
    >
      <GstCalculator />
    </CalculatorLayout>
  );
}
