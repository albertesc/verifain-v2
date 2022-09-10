import { useEffect, useState } from 'react'
import clientsService from '../services/clients'
import getLocalAccount from '../utils/getLocalAccount'
import useLoading from './useLoading'

export default function useClients () {
  const { accountRef, token } = getLocalAccount()
  const [loading, startLoading, stopLoading] = useLoading()
  const [clients, setClients] = useState([])

  useEffect(() => {
    startLoading()

    clientsService.getClients({ accountRef, token })
      .then(clients => {
        setClients(clients)
        stopLoading()
      })
  }, [setClients])

  return [clients, loading]
}
