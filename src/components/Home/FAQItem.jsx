import { Plus } from "lucide-react"

const FAQItem = ({question, answer}) => {
  return (
    <div className="rounded-lg border border-gray-500 p-3 md:p-4 lg:p-6 bg-main/5">
      <div className="flex items-center justify-between cursor-pointer">
        <h3 className="text-main font-semibold text-base md:text-lg lg:text-xl">{question}</h3>
        <Plus className="size-5 rotate-45" />
      </div>
      <p className="text-muted text-sm md:text-base mt-4 leading-relaxed">{answer}</p>
    </div>
  )
}

export default FAQItem