'use client'

import { useState } from "react"
import { SessonContext } from "./SessonContext"

export const SessonProvider = ({children, ...props}) => {
    const [item, setItem] = useState(props.sesson || {})
    return(
        <SessonContext.Provider value={{sesson:item, setSesson:setItem}}>
            {children}
        </SessonContext.Provider>
    )
}