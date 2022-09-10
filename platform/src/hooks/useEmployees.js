import { useEffect, useState } from 'react'
import employeesService from '../services/employees'
import getLocalAccount from '../utils/getLocalAccount'
import useLoading from './useLoading'

export default function useEmployees () {
  const { accountRef, token } = getLocalAccount()
  const [loading, startLoading, stopLoading] = useLoading()
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    startLoading()

    employeesService.getEmployees({ accountRef, token })
      .then(employees => {
        setEmployees(employees)
        stopLoading()
      })
  }, [setEmployees])

  return [employees, loading]
}
