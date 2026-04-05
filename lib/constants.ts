export const siteConfig = {
  name: "Komil Koshti",
  title: "Komil Koshti — Accounting & Taxation Services in Ahmedabad",
  description:
    "Professional accounting, GST filing, income tax returns, and business advisory services by Komil Koshti in Ahmedabad, Gujarat, India.",
  url: "https://komilkoshti.com",
  phone: "+918306517999",
  email: "kkomil134@gmail.com",
  whatsapp: "https://wa.me/918306517999",
  address: "Ahmedabad, Gujarat, India",
  workingHours: "Mon – Sat, 10:00 AM – 7:00 PM",
  linkedin: "https://linkedin.com/in/komilkoshti",
  stats: {
    returns: "500+",
    returnsLabel: "Returns Filed",
    experience: "4+",
    experienceLabel: "Years Experience",
    compliance: "100%",
    complianceLabel: "Compliance Rate",
  },
} as const;

export type NavItem = {
  title: string;
  href: string;
  children?: NavItem[];
};

export const navLinks: NavItem[] = [
  { title: "About", href: "/about" },
  {
    title: "Services",
    href: "/services",
    children: [
      { title: "GST Filing & Compliance", href: "/services/gst-filing" },
      { title: "Income Tax Returns", href: "/services/income-tax" },
      { title: "Business Registration", href: "/services/business-registration" },
      { title: "Bookkeeping & Accounting", href: "/services/bookkeeping" },
      { title: "TDS Returns", href: "/services/tds-returns" },
      { title: "Audit & Assurance", href: "/services/audit" },
    ],
  },
  {
    title: "Tools",
    href: "/tools",
    children: [
      { title: "GST Calculator", href: "/tools/gst-calculator" },
      { title: "Income Tax Calculator", href: "/tools/income-tax-calculator" },
    ],
  },
  { title: "Blog", href: "/blog" },
  { title: "Bulletin", href: "/bulletin" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];
