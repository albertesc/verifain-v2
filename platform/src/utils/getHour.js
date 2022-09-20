const options = {
  minute: 'numeric',
  hour: '2-digit'
}

export default function getHour (date) {
  return new Date(date).toLocaleDateString('es-ES', options)
}
