import axios from 'axios'
import getLocalAccount from '../utils/getLocalAccount'
import getLocaleStringMs from '../utils/getLocaleStringMiliseconds'
import getRecuranceDayName from '../utils/getRecuranceDayName'

const getActions = async () => {
  const { accountRef, token } = getLocalAccount()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const allActions = await axios.get('/api/actions', config)
  const actions = allActions.data
    .filter(action => action.closed === false && action.notScheduled === false)

  return actions
}

const getActionsByDate = async (filterDate) => {
  const { accountRef, token } = getLocalAccount()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const actions = await axios.get('/api/actions', config)

  const actionsByDate = actions.data
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

const getActionById = async (id) => {
  const { accountRef, token } = getLocalAccount()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  const action = await axios.get(`/api/actions/${id}`, config)
  return action.data
}

const createAction = async (action) => {
  const { accountRef, token } = getLocalAccount()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }
  await axios.post('/api/actions', action, config)
}

const updateAction = async (action) => {
  const { accountRef, token } = getLocalAccount()

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }

  const endDate = new Date().getTime() <= getLocaleStringMs(action.endDate)
    ? new Date().toISOString()
    : action.endDate

  const closedAction = { closed: true, endDate }
  await axios.put(`/api/actions/${action.id}`, closedAction, config)
  await axios.post('/api/actions', action, config)
}

const deleteAction = async (id) => {
  const { accountRef, token } = getLocalAccount()
  const action = await getActionById(id)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      tenant: accountRef
    }
  }

  const endDate = new Date().getTime() <= getLocaleStringMs(action.endDate)
    ? new Date().toISOString()
    : action.endDate

  const closeAction = { closed: true, endDate }
  await axios.put(`/api/actions/${action.id}`, closeAction, config)
}

export default {
  getActions,
  getActionsByDate,
  getActionById,
  createAction,
  updateAction,
  deleteAction
}
