const DAY_NUMBER_DICTIONARY = {
  0: 'EVERY_SUNDAY',
  1: 'EVERY_MONDAY',
  2: 'EVERY_TUESDAY',
  3: 'EVERY_WEDNESDAY',
  4: 'EVERY_THURSDAY',
  5: 'EVERY_FRIDAY',
  6: 'EVERY_SATURDAY'
}

const getRecuranceDayName = day => {
  return DAY_NUMBER_DICTIONARY[day]
}

export default getRecuranceDayName
