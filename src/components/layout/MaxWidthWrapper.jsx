import { cn } from "../../lib/utils"

const MaxWidthWrapper = ({children, className}) => {
  return (
    <div className={cn("mx-auto max-w-7xl p-4 sm:p-6", className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper