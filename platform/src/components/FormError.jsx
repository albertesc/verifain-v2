
export default function FormInput ({ error }) {
  return error && <span className='text-red-500'>{error}</span>
}
