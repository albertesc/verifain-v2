import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Link to='/'>
        <h1 className='text-3xl font-bold'>Verifain Platform</h1>
      </Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  )
}
