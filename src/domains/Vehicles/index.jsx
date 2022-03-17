import React, { useEffect, useState } from 'react'
import { VehicleCard } from '../../components/VehicleCard/VehicleCard'
import { carColor } from '../../constants/car'
import { getVehicles } from '../../services/vehicles'
import styles from './Vehicles.module.scss'

export const Vehicles = () => {
  const [cars, setCars] = useState([])
  const [order, setOrder] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <>
      <h3>My garage</h3>
      <div className={styles.actionsContainer}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            setOrder(!order)
          }}
        >
          {order ? 'Reset order' : 'Only Black & White'}
        </button>
      </div>
      <div className={styles.cardsContainer}>
        {order
          ? cars
              .filter(
                (car) =>
                  car.color === carColor.WHITE || car.color === carColor.BLACK
              )
              .map((car) => <VehicleCard key={car.uid} vehicle={car} />)
          : cars.map((car) => <VehicleCard key={car.uid} vehicle={car} />)}
      </div>
    </>
  )
}
