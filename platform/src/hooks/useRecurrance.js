export default function useRecurrance () {
  const recurranceOptions = [
    { label: 'Diaria', value: 'DAILY' },
    { label: 'Semanal', value: 'WEEKLY' },
    { label: 'Mensual', value: 'MONTHLY' }
  ]

  const recurranceDays = [
    { id: 0, label: 'Lunes', value: 'EVERY_MONDAY' },
    { id: 1, label: 'Martes', value: 'EVERY_TUESDAY' },
    { id: 2, label: 'Miércoles', value: 'EVERY_WEDNESDAY' },
    { id: 3, label: 'Jueves', value: 'EVERY_THURSDAY' },
    { id: 4, label: 'Viernes', value: 'EVERY_FRIDAY' },
    { id: 5, label: 'Sábado', value: 'EVERY_SATURDAY' },
    { id: 6, label: 'Domingo', value: 'EVERY_SUNDAY' }
  ]

  return { recurranceOptions, recurranceDays }
}
