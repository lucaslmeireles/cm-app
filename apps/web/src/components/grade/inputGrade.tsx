"use client"
import { Input } from "@/repo/ui/components/ui/input"
import { useState } from "react"

export const InputGrade = ({getValue, row, column, table}) => {
    const [state, setState] = useState()
    const onBlur = () => {
        table.options.meta?.updateData(
            row.index,
            column.id,
            state
        )
    }
    return (
        <Input type="number" placeholder="Insira uma nota" onChange={(e) => setState(e.target.value)} onBlur={onBlur}/>
    )
}