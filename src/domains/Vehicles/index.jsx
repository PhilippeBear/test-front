import React, { useEffect, useState } from 'react'
import { VehicleCard } from '../../components/VehicleCard/VehicleCard'
import { carColor } from '../../constants/car'
import { getVehicles } from '../../services/vehicles'
import styles from './Vehicles.module.scss'

// Remarque: j'aime pas le folder domains je suis pas sur de pourquoi c'est là ni du naming
// Fix: Changement de l'export
// Fix: Changement du nom Vehicule en Vehicles qui est plus logique
export const Vehicles = () => {
  const [cars, setCars] = useState([])
  const [order, setOrder] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // J'ai sorti la fonction, j'aime pas l'avoir dans le useEffect
  // J'ai ajouté une gestion simple de loading/error
  const fetchCars = async () => {
    setIsLoading(true)
    const data = await getVehicles()
    if (!data) {
      setIsError(true)
    } else {
      setCars(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCars()
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  if (isError) {
    return <>There was an error...</>
  }

  if (order) {
    return (
      <>
      {/* Review: pourquoi un H3 ? Pas très important mais si ça avait été référencé c'était bizarre ici niveau hiérarchie */}
        <h3>My garage</h3>
        <div className={styles.actionsContainer}>
          {/* Fix: niveau HTML, les butto ont normalement besoin d'un type */}
          {/* Fix: le switch sur order ici est pas propre et potentiellement dangereux (d'ailleurs ça fonctionne pas je crois). Autant utilisé un state */}
          <button className={styles.button} type="button" onClick={() => setOrder(false)}>Reset order</button>
        </div>
        <div className={styles.cardsContainer}>
          {/* Review: C'est pas très propre et pas très lisible tel quel */}
          {
            // Review: C'est un avis personnel mais j'aime pas les return sur la même ligne que les conditions
            // Je trouve qu'on  perd en lisibilité
            // Review: Le 'Black' et 'White' en string en dure, ça fonctionne mais ça aurait été plus propre
            // de le sortir dans une enum à appelé comme ça : car.color !== carColor.WHITE. Je trouve ça
            // plus maintenable, ça évite les soucis un peu bête si un jour une couleur chagne de nom
            // côté API où il faudrait changer partout etc...

            // Fix: remplacer le map avec if par un filter.
            // Review: on aurait pu rajouter un empty state si nous n'avons pas de cars avec et sans le filtre des couleurs.

            cars
              .filter((car) => car.color === carColor.WHITE || car.color === carColor.BLACK)
              .map(car => <VehicleCard key={car.id} vehicle={car} />)
          }
        </div>
      </>
    )
  }

  return (
    <>
      <h3>My garage</h3>
      <div className={styles.actionsContainer}>
        {/* Fix: niveau HTML, les butto ont normalement besoin d'un type */}
        {/* Fix: on ne devrait pas avoir de style inline ici, on utilise styled component on doit le sortir */}
        {/* Fix: le switch sur order ici est pas propre et potentiellement dangereux. Autant utilisé un state */}
        <button
          type="button"
          className={styles.button}
          onClick={() => setOrder(true)}
        >
          Only black & white
        </button>
      </div>
      <div className={styles.cardsContainer}>
        {cars.map((car) => (
          <VehicleCard key={car.id} vehicle={car} />
        ))}
      </div>
    </>
  )
}