import filterActionSigningsPerDate from '../../../utils/getActionSigningsPerDate'
import getTimeFormat from '../../../utils/getTimeFormat'

const signingIn = (rowData, filterDate) => {
  const [signingDates] = filterActionSigningsPerDate(rowData.signings, filterDate)

  return signingDates && signingDates.signingIn
    ? <span>{getTimeFormat(signingDates.signingIn)}</span>
    : '-'
}

export default signingIn
