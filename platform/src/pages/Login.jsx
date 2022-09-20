import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormControl from '../components/FormControl'
import useAuth from '../hooks/useAuth'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = e => {
    e.preventDefault()
    login({ email, password })
      .then(() => navigate('/'))
      .catch(() => {
        setError('Usuario o password incorrectos')
        setTimeout(() => {
          setError(null)
        }, 2000)
      })
  }

  return (
    <div className='container max-w-2xl mx-auto'>
      <h2 className='text-xl mt-12 mb-10'>Verifain Platform Login</h2>

      <form onSubmit={handleLogin}>
        <FormControl
          name='email' label='Email' type='text' value={email}
          placeholder='Escribe tu Email' autoComplete='userName' onChange={({ target }) => setEmail(target.value)}
        />
        <FormControl
          name='password' label='Password' type='password' value={password}
          placeholder='Escribe tu password' autoComplete='current-password' onChange={({ target }) => setPassword(target.value)}
        />
        <div className='text-red-500 mb-3'>{error}</div>
        <Button type='submit'>Entrar</Button>
      </form>
    </div>
  )
}
