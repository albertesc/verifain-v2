const options = {
  timeZone: 'Europe/Madrid',
  timeZoneName: 'longOffset',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  fractionalSecondDigits: 3
}

export default function getLocaleStringMiliseconds (date) {
  const strLocale = date.toLocaleString('es-ES', options)
  const isoStrTz = strLocale.replace(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2}),(\d+)\s+/, '$1-$2-$3T$4:$5:$6.$7').replace('GMT−', '-').replace('GMT+', '+')
  return new Date(isoStrTz).getTime()
}
