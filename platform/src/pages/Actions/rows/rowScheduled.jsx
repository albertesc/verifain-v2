const scheduled = rowData => {
  return rowData.notProgrammed
    ? <span className='text-yellow-400'>No programado</span>
    : <span className='text-gray-500'>Programado</span>
}

export default scheduled
