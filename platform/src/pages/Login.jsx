import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import FormPassword from '../components/FormPassword'
import useAuth from '../hooks/useAuth'
import loginSchema from '../schemas/loginSchema'

export default function Login () {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) })

  const onSubmit = credentials => {
    login(credentials)
      .then(() => navigate('/'))
      .catch(() => {
        setErrorMessage('Credenciales incorrectas')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  return (
    <div className='container max-w-2xl mx-auto'>
      <h2 className='text-xl mt-12 mb-10'>Verifain Platform Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control} name='email' label='Email'
          placeholder='Escribe tu correo electrónico' error={errors.email?.message}
        />

        <FormPassword
          control={control} name='password' label='Contraseña' feedback={false}
          placeholder='Escribe tu contraseña' error={errors.password?.message}
        />

        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        <Button className='mt-8' type='submit'>Entrar</Button>
      </form>
    </div>
  )
}
