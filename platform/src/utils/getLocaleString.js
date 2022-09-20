export default function getLocaleString (date) {
  const strLocale = new Date(new Date(date).setHours(2, 0, 0, 0)).toISOString().split('.')
  const strLocaleString = strLocale[0] + '.' + strLocale[1].replace('Z', '+02:00').toString()
  return strLocaleString
}
