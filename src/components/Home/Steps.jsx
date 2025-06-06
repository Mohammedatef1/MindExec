import MaxWidthWrapper from "../layout/MaxWidthWrapper"

const STEPS = [
  {
    title: "Build Your Workflow",
    desc: "Customize your scan setup using intuitive tools to define how and what to test."
  },
  {
    title: "Enter Target URL",
    desc: "Input the web application's URL to begin scanning for potential vulnerabilities."
  },
  {
    title: "View Report",
    desc: "Review an actionable report with identified issues, severity levels, and suggestions."
  },
]

const Steps = () => {
  return (
    <section className="bg-[#2C0061] py-10 md:py-20 lg:py-32">
      <MaxWidthWrapper className="space-y-6 md:space-y-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Secure Your Web App <br /> in Three Simple Powerful Steps</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {STEPS.map((step, index) => (
            <div key={index} className="rounded-lg bg-[#440196] p-4 md:p-6 lg:p-8 space-y-1.5 md:space-y-2">
              <p className="text-[72px] step-count leading-none font-bold">{index + 1}</p>
              <h3 className="text-main font-semibold text-lg md:text-xl lg:text-2xl">{step.title}</h3>
              <p className="text-muted text-sm md:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default Steps