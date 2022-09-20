
export default function PageHeader ({ title }) {
  return (
    <header>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='md:flex md:items-center md:justify-between'>
          <div className='flex-1 min-w-0'>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>{title}</h2>
          </div>
        </div>
      </div>
    </header>
  )
}
