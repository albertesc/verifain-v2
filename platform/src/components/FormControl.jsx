export default function FormControl ({ name, label, type, placeholder, error, register, children, ...props }) {
  const style = !error
    ? 'appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm'
    : 'appearance-none block w-full px-3 py-2 border border-red-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'

  return (
    <div className='mb-4'>
      <label htmlFor={name} className='block text-sm font-medium text-slate-700 mb-1'>{label}</label>
      {!register
        ? <input name={name} type={type} placeholder={placeholder} className={style} {...props} />
        : <input {...register(name)} type={type} placeholder={placeholder} className={style} {...props} />}
      {error && <span className='text-red-500'>{error.message}</span>}
      {children}
    </div>
  )
}
