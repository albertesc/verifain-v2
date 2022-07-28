import Header from './Header'

export default function Layout ({ children }) {
  return (
    <div className='App'>
      <div className=''>
        <Header />
        <div className='py-10'>
          {children}
        </div>
      </div>
    </div>
  )
}
