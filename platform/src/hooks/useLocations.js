import { useEffect, useState } from 'react'
import locationsService from '../services/locations'
import getLocalAccount from '../utils/getLocalAccount'
import useLoading from './useLoading'

export default function useLocations () {
  const { accountRef, token } = getLocalAccount()
  const [loading, startLoading, stopLoading] = useLoading()
  const [locations, setLocations] = useState([])

  useEffect(() => {
    startLoading()

    locationsService.getLocations({ accountRef, token })
      .then(locations => {
        setLocations(locations)
        stopLoading()
      })
  }, [setLocations])

  return [locations, loading]
}
