import filterActionSigningsPerDate from '../../../utils/getActionSigningsPerDate'
import getTimeFormat from '../../../utils/getTimeFormat'

const signingOut = (rowData, filterDate) => {
  const [signingDates] = filterActionSigningsPerDate(rowData.signings, filterDate)
  const hour = rowData.hour.split(':')
  const duration = rowData.duration.split(':')
  const date = new Date(filterDate).setHours(hour[0], hour[1], 0, 0)
  const finishHour = date + (duration[0] * 3600000 + duration[1] * 60000)

  const notSignOut = signingDates && !signingDates.signingOut && finishHour < new Date().getTime()

  if (notSignOut) { return <span className='text-red-500'>No fichado</span> }

  return signingDates && signingDates.signingOut
    ? <span>{getTimeFormat(signingDates.signingOut)}</span>
    : '-'
}

export default signingOut
