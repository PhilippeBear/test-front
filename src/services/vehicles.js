export const getVehicles = async () => {
  const data = fetch(
    'https://random-data-api.com/api/vehicle/random_vehicle?size=10'
  )
    .then(async (response) => response.json())
    .catch((error) => console.error('Error: ', error))

  return data
}

export const getVehicle = async (id) => {
  const data = fetch(
    // Bon, forcément avec le Random API ça fonctionne pas mais ça aurait pu
    // du coup j'ai juste mis un size = 1 pour faire genre que ça marchouille
    `https://random-data-api.com/api/vehicle/random_vehicle?size=1?id=${id}`
  )
    .then(async (response) => response.json())
    .catch((error) => console.error('Error: ', error))

  return data
}
