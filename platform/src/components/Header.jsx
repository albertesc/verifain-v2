import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Plan del dia', href: '/today' },
  { name: 'Fichajes', href: '/signings' },
  { name: 'Empleados', href: '/employees' },
  { name: 'Clientes', href: '/clients' },
  { name: 'Locales', href: '/locations' },
  { name: 'Informes', href: '/reports' },
  { name: 'Etiquetas QR', href: '/labels' }
]

export default function Header () {
  return (
    <div className='min-h-full'>
      <nav className='bg-white border-b border-gray-200'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <img className='block lg:hidden h-10 w-auto' src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg' alt='Workflow' />
                <img className='hidden lg:block h-10 w-auto' src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg' alt='Workflow' />
              </div>

              <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                {navigation.map(({ name, href }) => (
                  <Link key={name} to={href} className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2'> {name} </Link>
                ))}
              </div>
            </div>

            <div className='hidden sm:ml-6 sm:flex sm:items-center'>
              <div className='ml-3 relative'>
                <div>
                  <button type='button' className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' id='user-menu-button' aria-expanded='false' aria-haspopup='true'>
                    <span className='sr-only'>Open user menu</span>
                    <img className='h-10 w-10 rounded-full' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
                  </button>
                </div>
              </div>
            </div>

            <div className='-mr-2 flex items-center sm:hidden'>
              <button type='button' className='bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' aria-controls='mobile-menu' aria-expanded='false'>
                <span className='sr-only'>Open main menu</span>

                <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' aria-hidden='true'>
                  <path stroke-linecap='round' stroke-linejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                </svg>

                <svg className='hidden h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' aria-hidden='true'>
                  <path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className='sm:hidden' id='mobile-menu'>
          <div className='pt-2 pb-3 space-y-1'>
            {navigation.map(({ name, href }) => (
              <Link key={name} to={href} className='border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4'>{name}</Link>
            ))}
          </div>

          <div className='pt-4 pb-3 border-t border-gray-200'>
            <div className='flex items-center px-4'>
              <div className='flex-shrink-0'>
                <img className='h-10 w-10 rounded-full' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
              </div>

              <div className='ml-3'>
                <div className='text-base font-medium text-gray-800'>Tom Cook</div>
                <div className='text-sm font-medium text-gray-500'>tom@example.com</div>
              </div>
            </div>

            <div className='mt-3 space-y-1'>
              <a href='#' className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'> Your Profile </a>
              <a href='#' className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'> Settings </a>
              <a href='#' className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'> Sign out </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
