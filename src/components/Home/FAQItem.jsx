import { Plus } from "lucide-react"

const FAQItem = ({question, answer}) => {
  return (
    <div className="rounded-lg border border-gray-500 p-4 lg:p-6 bg-main/5">
      <div className="flex items-center justify-between cursor-pointer">
        <h3 className="text-main font-semibold text-base md:text-lg lg:text-xl">{question}</h3>
        <Plus className="size-5 rotate-45" />
      </div>
      <div className="overflow-hidden">
        <p className="text-muted text-sm md:text-base mt-2 md:mt-4 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default FAQItem