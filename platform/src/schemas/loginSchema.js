import * as yup from 'yup'

const loginFormSchema = yup.object({
  email: yup.string()
    .email('Escribe un email válido')
    .required('El email es obligatorio'),

  password: yup.string()
    .required('La contraseña es obligatoria')
}).required()

export default loginFormSchema
