import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsFilterCircleFill } from 'react-icons/bs'
import { VehicleCard } from '../../components/VehicleCard/VehicleCard'
import { carColor } from '../../constants/car'
import { getVehicles } from '../../services/vehicles'

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
    return <Text>Loading...</Text>
  }

  if (isError) {
    return <Text>There was an error...</Text>
  }

  return (
    <Box px="24">
      <Flex py="4" w="full" justifyContent="space-between">
        <Heading as="h1">My garage</Heading>
        <Button
          colorScheme="primary"
          leftIcon={<BsFilterCircleFill />}
          onClick={() => {
            setOrder(!order)
          }}
        >
          {order ? 'Reset order' : 'Only Black & White'}
        </Button>
      </Flex>
      <Flex mt="4" px="4" w="full">
        <Box w="10rem">#ID</Box>
        <Box w="full">Name</Box>
        <Box w="20rem" textAlign="right">
          Doors
        </Box>
        <Box w="20rem" textAlign="right">
          Miles
        </Box>
      </Flex>
      <Divider />
      {order
        ? cars
            .filter(
              (car) =>
                car.color === carColor.WHITE || car.color === carColor.BLACK
            )
            .map((car) => <VehicleCard key={car.uid} vehicle={car} />)
        : cars.map((car) => <VehicleCard key={car.uid} vehicle={car} />)}
    </Box>
  )
}
