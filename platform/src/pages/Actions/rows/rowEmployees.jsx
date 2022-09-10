const employees = rowData => {
  return rowData.employees.map(employee => `${employee.name} ${employee.surname}`).join(', ')
}

export default employees
