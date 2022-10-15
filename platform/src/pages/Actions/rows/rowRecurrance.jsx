const rowRecurrance = ({ recurrance }) => {
  if (recurrance === 'DAILY') return 'Diaria'
  if (recurrance === 'WEEKLY') return 'Semanal'
  if (recurrance === 'MONTHLY') return 'Mensual'
}

export default rowRecurrance
