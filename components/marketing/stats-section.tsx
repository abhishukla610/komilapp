import { siteConfig } from "@/lib/constants";

const stats = [
  { value: siteConfig.stats.returns, label: siteConfig.stats.returnsLabel },
  {
    value: siteConfig.stats.experience,
    label: siteConfig.stats.experienceLabel,
  },
  {
    value: siteConfig.stats.compliance,
    label: siteConfig.stats.complianceLabel,
  },
];

export function StatsSection() {
  return (
    <section className="bg-[#1a365d] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium tracking-wide text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
