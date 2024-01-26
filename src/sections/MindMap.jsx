import MindNode from "../components/Node"
import { useContext } from "react"
import AppContext from "../AppContext"

const MindMap = () => {

  const ctx = useContext(AppContext);
  return (
    <div id="container" className={`${ctx.builder? 'w-3/5': 'w-4/5'} h-full`}><MindNode /></div>
  )
}

export default MindMap