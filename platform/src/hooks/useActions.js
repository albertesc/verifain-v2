import { useEffect, useState } from 'react'
import actionsService from '../services/actions'
import getLocalAccount from '../utils/getLocalAccount'
import useLoading from './useLoading'

export default function useActions (filterDate) {
  const { accountRef, token } = getLocalAccount()
  const [loading, startLoading, stopLoading] = useLoading()
  const [actions, setActions] = useState([])

  useEffect(() => {
    startLoading()

    actionsService.getActionsByDate({ accountRef, token }, new Date(filterDate))
      .then(actions => {
        setActions(actions)
        stopLoading()
      })
  }, [setActions, filterDate])

  return [actions, loading]
}
