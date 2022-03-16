// Changement de l'export directement au niveau de la const
// On aurait pu installer axios mais là c'est surement overkill
// Fix: ajout de gestion des erreurs

export const getVehicles = async () => {
  const data = fetch(
    'https://random-data-api.com/api/vehicle/random_vehicle?size=10'
  )
    .then(async (response) => response.json())
    .catch((error) => console.error('Error: ', error))

  // Le await ici m'a l'air de trop sur la response, du coup j'ai enlevé et ensuite refacto

  return data
}
