import { createContext } from 'react'
import { DatePickerContextType } from '../../types'

export const DatePickerContext = createContext<DatePickerContextType | undefined>(undefined)
