import { TodosContext } from "../Context/TodosContext"
import { useContext } from "react"

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if(!context) {
    throw Error('useTodosContext must be used inside an TodosContextProvider')
  }

  return context
}