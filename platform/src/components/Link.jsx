import { Link } from 'react-router-dom'

export default function ButtonLink ({ children, className = '', ...props }) {
  return (
    <Link {...props} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${className}`}>
      {children}
    </Link>
  )
}
