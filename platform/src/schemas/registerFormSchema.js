import * as yup from 'yup'

const formSchema = yup.object({
  companyName: yup.string()
    .required('El nombre de la empresa es obligatorio'),

  username: yup.string()
    .required('El nombre de usuario es obligatorio'),

  email: yup.string()
    .email('Escribe un email válido')
    .required('El email es obligatorio'),

  password: yup.string()
    .required('La contraseña es obligatoria')
    .matches(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
      'Debe contener 8 caracteres, uno en mayúscula, uno en minúscula, un número y un carácter de caso especial'
    ),

  repeatPassword: yup.string()
    .required('La contraseña es obligatoria')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
}).required()

export default formSchema
