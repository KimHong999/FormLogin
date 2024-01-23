'use client'
import { useContext } from "react"
import { SessonContext } from "./SessonContext"


export const UseSesson = () => {
    return useContext(SessonContext);
}