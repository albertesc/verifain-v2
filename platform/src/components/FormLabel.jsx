export default function FormLabel ({ htmlFor, label }) {
  return (
    <label htmlFor={htmlFor} className='mb-2 text-gray-500'>{label}</label>
  )
}
