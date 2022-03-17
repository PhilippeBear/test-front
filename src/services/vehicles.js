export const getVehicles = async () => {
  const data = fetch(
    'https://random-data-api.com/api/vehicle/random_vehicle?size=100'
  )
    .then(async (response) => response.json())
    .catch((error) => console.error('Error: ', error))

  return data
}
