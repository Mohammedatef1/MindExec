import { Instagram } from "lucide-react"
import { X } from "lucide-react"
import { Facebook } from "lucide-react"

const SocialItems = [
  {
    Icon: Instagram ,
    link: ""
  },
  {
    Icon: Facebook ,
    link: ""
  },
  {
    Icon: X ,
    link: ""
  },
]

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-x-3 md:gap-x-6 gap-y-3">
      {SocialItems.map((Item, idx) => (
        <a href={Item.link || "#"} key={idx} className="social-item size-9 flex items-center justify-center rounded-[4px]"> 
           {/* <Facebook className="text-main font-bold size-4" /> */}
           <Item.Icon className="text-main font-bold size-4" />
        </a>
      ))}
    </div>
  )
}

export default SocialIcons