function getTimeDifference (dateFuture, dateNow) {
  const dateFutureDate = new Date(dateFuture)
  const dateNowDate = new Date(dateNow)

  let diffInMilliSeconds = Math.abs(dateFutureDate - dateNowDate) / 1000

  const days = Math.floor(diffInMilliSeconds / 86400)
  diffInMilliSeconds -= days * 86400

  const hours = Math.floor(diffInMilliSeconds / 3600) % 24
  diffInMilliSeconds -= hours * 3600

  const minutes = Math.floor(diffInMilliSeconds / 60) % 60
  diffInMilliSeconds -= minutes * 60

  let difference = ''
  if (days > 0) {
    difference += (days === 1) ? `${days} días, ` : `${days} días, `
  }

  difference += (hours === 0 || hours === 1) ? `${hours} hora, ` : `${hours} horas, `
  difference += (minutes === 0 || hours === 1) ? `${minutes} minutos` : `${minutes} minutos`

  return difference
}

export default getTimeDifference
