import './styles/main.css'

export { DatePickerProvider as Provider } from './components/DatePickerProvider'
export { Calendar } from './components/Calendar'
export { Header, Button, Label } from './components/Header'
export { useDateSelect } from './hooks/useDateSelect'

export type {
  CalendarProps,
  HeaderProps,
  DatePickerProviderProps,
  SingleSelection,
  MultipleSelection,
  RangeSelection,
  ButtonProps,
  LabelProps,
  DayButtonClassNames,
  CalendarType,
  GroupingModeType,
  DayjsInstance
} from './types/index.d'

