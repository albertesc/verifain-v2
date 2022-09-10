const filterActionSigningsPerDate = (signings, date) => {
  const signingDates = signings.filter(signing => {
    return new Date(signing.signingIn).toLocaleDateString() === new Date(date).toLocaleDateString()
  })
  return signingDates
}

export default filterActionSigningsPerDate
