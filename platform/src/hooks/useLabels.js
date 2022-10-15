import { useEffect, useState } from 'react'
import labelsService from '../services/labels'
import getLocalAccount from '../utils/getLocalAccount'
import useLoading from './useLoading'

export default function useLabels () {
  const { accountRef, token } = getLocalAccount()
  const [loading, startLoading, stopLoading] = useLoading()
  const [labels, setLabels] = useState([])

  useEffect(() => {
    startLoading()

    labelsService.getLabels({ accountRef, token })
      .then(labels => {
        setLabels(labels)
        stopLoading()
      })
  }, [setLabels])

  return [labels, loading]
}
