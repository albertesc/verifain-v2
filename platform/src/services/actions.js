import axios from 'axios'
import getLocaleStringMs from '../utils/getLocaleStringMiliseconds'
import getRecuranceDayName from '../utils/getRecuranceDayName'

const getActions = async ({ accountRef, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const actions = await axios.get('/api/actions', config)
  return actions.data
}

const getActionsByDate = async ({ accountRef, token }, filterDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const actions = await axios.get('/api/actions', config)

  const actionsByDate = actions.data
    .filter(action => action.closed === false)
    .filter(action => {
      return (
        new Date(filterDate).getTime() >= getLocaleStringMs(action.startDate) &&
        new Date(filterDate).getTime() <= getLocaleStringMs(action.endDate)
      )
    })
    .filter(action => {
      if (action.recurrance === 'DAILY') { return true }
      if (action.recurrance === 'MONTHLY') {
        return new Date(action.startDate).getDate() === new Date(filterDate).getDate()
      }
      return action.recurranceDays.includes(getRecuranceDayName(filterDate.getDay()))
    })

  return actionsByDate
}

export default { getActions, getActionsByDate }
