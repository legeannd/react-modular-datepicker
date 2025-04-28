import { useContext } from "react";
import { DatePickerContext } from "../contexts/DatePickerContext";

export function useDatePicker() {
  const context = useContext(DatePickerContext)

  if (!context) {
    throw new Error('DatePicker components cannot be rendered outside the DatePickerProvider')
  }

  console.log(context)

  return context
}