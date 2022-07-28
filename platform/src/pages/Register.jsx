import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormControl from '../components/FormControl'
import registerSchema from '../schemas/registerFormSchema'
import accountsService from '../services/accounts'

export default function Register () {
  const navigate = useNavigate()
  const [errorUsername, setErrorUsername] = useState(null)
  const [ErrorEmail, setErrorEmail] = useState(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  })
  const usernameField = watch('username')
  const emailField = watch('email')

  const onSubmit = account => {
    accountsService.createAccount(account)
    navigate('/login')
  }

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedAppUser'))
    user && navigate('/employees')
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const accounts = await accountsService.getAccounts()
      const accountExists = accounts.find(({ accountName }) => accountName === usernameField)
      const accountExistsEmail = accounts.find(({ email }) => email === emailField)
      setErrorUsername(accountExists)
      setErrorEmail(accountExistsEmail)
    }
    (usernameField || emailField) && fetchUsers()
  }, [usernameField, emailField])

  return (
    <div className='container max-w-2xl mx-auto'>
      <h1 className='text-xl my-10'>Formulario de registro</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          name='companyName' label='Nombre empresa *' type='text'
          placeholder='Escribe tu nombre empresa' error={errors.companyName} register={register}
        />

        <FormControl
          name='username' label='Nombre de usuario (debe ser único) *' type='text'
          placeholder='Escribe un nombre de usuario' error={errors.username} register={register}
        >
          {errorUsername && <span className='text-red-500'>El nombre de usuario ya existe</span>}
        </FormControl>

        <FormControl
          name='email' label='Correo electrónico *' type='text'
          placeholder='Escribe tu correo electrónico' error={errors.email} register={register}
        >
          {ErrorEmail && <span className='text-red-500'>El correo electrónico ya existe</span>}
        </FormControl>

        <FormControl
          name='password' label='Contraseña *' type='password'
          placeholder='Escriba una contraseña segura' error={errors.password} register={register}
        />

        <FormControl
          name='repeatPassword' label='Repetir contraseña *' type='password'
          placeholder='Repita la contraseña' error={errors.repeatPassword} register={register}
        />

        <Button type='submit'>Registrame</Button>
      </form>
    </div>
  )
}
