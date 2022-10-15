import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import registerSchema from '../schemas/registerSchema'
import accountsService from '../services/accounts'

export default function Register () {
  const navigate = useNavigate()
  const [errorUsername, setErrorUsername] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(registerSchema) })
  const usernameField = watch('accountRef')
  const emailField = watch('email')

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

  const onSubmit = account => {
    accountsService.createAccount(account)
    navigate('/')
  }

  return (
    <div className='container max-w-2xl mx-auto'>
      <h1 className='text-xl my-10'>Formulario de registro</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control} name='companyName' label='Nombre de empresa'
          placeholder='Introduce el nombre de la empresa' error={errors.companyName?.message}
        />

        <FormInput
          control={control} name='accountRef' label='Nombre de usuario (debe ser único) *'
          placeholder='Introduce el nombre de usuario' error={errors.accountRef?.message || (errorUsername ? 'El nombre de usuario ya existe' : null)}
        />

        <FormInput
          control={control} name='email' label='Email (debe ser único) *'
          placeholder='Escribe tu correo electrónico' error={errors.email?.message || (errorEmail ? 'El email ya existe' : null)}
        />

        <FormInput
          control={control} name='password' label='Contraseña *'
          placeholder='Escriba una contraseña segura' error={errors.password?.message}
        />

        <FormInput
          control={control} name='repeatPassword' label='Repetir contraseña *'
          placeholder='Repita la contraseña' error={errors.repeatPassword?.message}
        />

        <Button type='submit'>Registrame</Button>
      </form>
    </div>
  )
}
