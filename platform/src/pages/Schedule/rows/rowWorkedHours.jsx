import filterActionSigningsPerDate from '../../../utils/getActionSigningsPerDate'
import getTimeDifference from '../../../utils/getTimeDifference'

const workedHours = (rowData, filterDate) => {
  const [signingDates] = filterActionSigningsPerDate(rowData.signings, filterDate)
  const signingIn = signingDates && signingDates.signingIn ? signingDates.signingIn : null
  const signingOut = signingDates && signingDates.signingOut ? signingDates.signingOut : null
  return signingIn && signingOut ? getTimeDifference(signingIn, signingOut) : '-'
}

export default workedHours
