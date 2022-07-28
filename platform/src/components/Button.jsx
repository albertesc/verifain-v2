export default function Button ({ children, ...props }) {
  return (
    <button {...props} className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'>
      {children}
    </button>
  )
}
