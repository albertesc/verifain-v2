import filterActionSigningsPerDate from '../../../utils/getActionSigningsPerDate'

const status = (rowData, filterDate) => {
  const [signingDates] = filterActionSigningsPerDate(rowData.signings, filterDate)
  const hour = rowData.hour.split(':')
  const duration = rowData.duration.split(':')
  const date = new Date(filterDate).setHours(hour[0], hour[1], 0, 0)
  const finishHour = date + (duration[0] * 3600000 + duration[1] * 60000)

  const isScheduled = !signingDates && finishHour > new Date().getTime()
  const isWorkInProgress = signingDates && !signingDates.signingOut && finishHour > new Date().getTime()
  const notSignOut = signingDates && !signingDates.signingOut && finishHour < new Date().getTime()
  const isNotAttended = !signingDates

  if (isScheduled) { return (<span className='text-gray-400'>En espera</span>) }
  if (isWorkInProgress) { return (<span className='text-gray-600'>En progreso...</span>) }
  if (isNotAttended) { return (<span className='text-red-400'>No atendido</span>) }
  if (notSignOut) { return (<span className='text-red-400'>No finalizado</span>) }

  return <span className='text-green-500'>Atendido</span>
}

export default status
