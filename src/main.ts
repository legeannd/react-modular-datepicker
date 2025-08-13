import './styles/main.css'

export { DatePickerProvider } from './components/DatePickerProvider'
export { Calendar } from './components/Calendar'
export { Header, Button, Label } from './components/Header'
export { useDateSelect } from './hooks/useDateSelect'

import { DatePickerProvider } from './components/DatePickerProvider'
import { Calendar } from './components/Calendar'
import { Header, Button, Label } from './components/Header'

export const DatePicker = {
  Provider: DatePickerProvider,
  Calendar: Calendar,
  Header: Header,
  Button: Button,
  Label: Label,
} as const

export type {
  CalendarProps,
  HeaderProps,
  DatePickerProviderProps,
  ButtonProps,
  LabelProps,
  DayButtonClassNames,
  CalendarType,
  GroupingModeType,
  DayjsInstance
} from './types/index.d'

