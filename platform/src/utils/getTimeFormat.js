const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
}

export default function getTimeFormat (date) {
  return new Date(date).toLocaleDateString('es-ES', options)
}
