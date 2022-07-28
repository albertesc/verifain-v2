import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormControl from '../components/FormControl'
import loginService from '../services/login'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedAppUser'))
    user && navigate('/employees')
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ email, password })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      navigate('/employees')
    } catch (err) {
      setError('Usuario o password incorrectos')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return (
    <div className='container max-w-2xl mx-auto'>
      <h2 className='text-xl mt-12 mb-10'>Verifain Platform Login</h2>

      <form onSubmit={handleLogin}>
        <FormControl
          name='email' label='Email' type='text' value={email}
          placeholder='Escribe tu Email' onChange={({ target }) => setEmail(target.value)}
        />
        <FormControl
          name='password' label='Password' type='password' value={password}
          placeholder='Escribe tu password' onChange={({ target }) => setPassword(target.value)}
        />
        <div className='text-red-500'>{error}</div>
        <Button type='submit'>Entrar</Button>
      </form>
    </div>
  )
}
