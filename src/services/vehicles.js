// Changement de l'export directement au niveau de la const
// On aurait pu installer axios mais là c'est surement overkill
// Fix: ajout de gestion des erreurs

export const getVehicles = async () => {
  const data = fetch(
    // Remarque: C'est un API Random, selon la doc on a pas de pagination possible de ce côté
    // Donc logiquement, on peut seulement ajouter la pagination côté front, ce que je trouve personnellement pas propre mais tant pis
    'https://random-data-api.com/api/vehicle/random_vehicle?size=100'
  )
    .then(async (response) => response.json())
    .catch((error) => console.error('Error: ', error))

  // Le await ici m'a l'air de trop sur la response, du coup j'ai enlevé et ensuite refacto

  return data
}
