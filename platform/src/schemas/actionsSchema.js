import * as yup from 'yup'

const actionFormSchema = yup.object({
  active: yup.boolean(),

  alarm: yup.boolean(),

  startDate: yup.string()
    .required('El dia de inicio es obligatorio'),

  endDate: yup.string()
    .required('El dia de fin es obligatorio'),

  hour: yup.string()
    .required('La hora es obligatoria'),

  duration: yup.string()
    .required('La duración es obligatoria'),

  recurrance: yup.string()
    .required('La recurrencia es obligatoria'),

  recurranceDays: yup.array()
    .when('recurrance', {
      is: 'WEEKLY',
      then: (schema) => schema.required('Los días de la semana son obligatorios')
    }),

  employees: yup.array().required('Los empleados son obligatorios'),

  locationId: yup.string().required('La localización es obligatoria')
}).required()

export default actionFormSchema
