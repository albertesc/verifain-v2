import { useEffect, useState } from 'react'
import actionsService from '../services/actions'
import useLoading from './useLoading'

export default function useActions (filterDate) {
  const [loading, startLoading, stopLoading] = useLoading()
  const [actionsByDate, setActionsByDate] = useState([])

  useEffect(() => {
    startLoading()

    actionsService.getActionsByDate(new Date(filterDate))
      .then(actions => {
        setActionsByDate(actions)
        stopLoading()
      })
  }, [setActionsByDate, filterDate])

  return { actionsByDate, loading }
}
