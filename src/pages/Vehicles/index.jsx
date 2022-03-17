/* eslint-disable no-restricted-globals */
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Select,
  Spinner,
  Stack,
  Text,
  useBreakpoint
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsFilterCircleFill, BsXCircleFill } from 'react-icons/bs'
import { IllustrationError } from '../../components/illustrations'
import { VehicleCard } from '../../components/VehicleCard/VehicleCard'
import { carColor } from '../../constants/car'
import { getVehicles } from '../../services/vehicles'

export const Vehicles = () => {
  const [cars, setCars] = useState([])
  const [withColorFilter, setWithColorFilter] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectOption, setSelectOption] = useState('all')

  const currentBreakpoint = useBreakpoint()
  const isMobile = currentBreakpoint === 'base' || currentBreakpoint === 'sm'

  const fetchCars = async () => {
    setIsLoading(true)
    const data = await getVehicles()
    if (data?.status === 404) {
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
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh" w="full">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="primary.200"
          color="secondary.500"
          size="xl"
        />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        w="full"
      >
        <Box w="18rem">
          <IllustrationError width="100%" />
        </Box>
        <Text mt="8" px="8" textAlign="center">
          An error happened, please try to reload your page :(
        </Text>
        <Button colorScheme="primary" mt="8" onClick={() => location.reload()}>
          Reload
        </Button>
      </Flex>
    )
  }

  return (
    <>
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        w="full"
        justifyContent={{ base: 'center', md: 'space-between' }}
        alignItems={{ base: 'center', md: 'space-between' }}
      >
        <Heading w="auto" as="h1" mb={{ base: 4, md: '0' }}>
          My garage
        </Heading>
        <Stack
          justifyContent={{ base: '', sm: 'flex-end' }}
          w={{ base: 'full', md: 'auto' }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Select
            w={{ base: 'full', md: 'auto' }}
            placeholder="All"
            onChange={(e) =>
              setSelectOption(e.target.value ? e.target.value : 'all')
            }
          >
            <option value="50000">{`Mileage < 50 000`}</option>
            <option value="30000">{`Mileage < 30 000`}</option>
          </Select>
          <Button
            w={{ base: 'full', md: 'auto' }}
            colorScheme={withColorFilter ? 'gray' : 'primary'}
            leftIcon={
              withColorFilter ? <BsXCircleFill /> : <BsFilterCircleFill />
            }
            onClick={() => {
              setWithColorFilter(!withColorFilter)
            }}
          >
            {withColorFilter ? 'Reset order' : 'Only Black & White'}
          </Button>
        </Stack>
      </Flex>
      {!isMobile && (
        <>
          <Flex mt="4" px="4" w="full">
            <Box w="10rem">#ID</Box>
            <Box w="full">Name</Box>
            <Box w="20rem" textAlign="right">
              Doors
            </Box>
            <Box w="20rem" textAlign="right">
              Miles
            </Box>
            <Flex w="10rem" />
          </Flex>
          <Divider />
        </>
      )}
      {cars
        // Filter for order
        .filter((car) => {
          if (!withColorFilter) {
            return true
          }
          return car.color === carColor.WHITE || car.color === carColor.BLACK
        })
        // Filter for miles
        .filter((car) => {
          if (selectOption === 'all') {
            return true
          }
          return car.mileage < parseInt(selectOption, 10)
        }).length > 0 ? (
        cars
          // Filter for order
          .filter((car) => {
            if (!withColorFilter) {
              return true
            }
            return car.color === carColor.WHITE || car.color === carColor.BLACK
          })
          // Filter for miles
          .filter((car) => {
            if (selectOption === 'all') {
              return true
            }
            return car.mileage < parseInt(selectOption, 10)
          })
          .map((car) => (
            <VehicleCard key={car.uid} vehicle={car} isMobile={isMobile} />
          ))
      ) : (
        <Flex w="full" justifyContent="center" mt="4">
          There is no result for that.
        </Flex>
      )}
      {/* {cars
        // Filter for order
        .filter((car) => {
          if (!withColorFilter) {
            return true
          }
          return car.color === carColor.WHITE || car.color === carColor.BLACK
        })
        // Filter for miles
        .filter((car) => {
          if (selectOption === 'all') {
            return true
          }
          return car.mileage < parseInt(selectOption, 10)
        })
        .map((car) => (
          <VehicleCard key={car.uid} vehicle={car} isMobile={isMobile} />
        ))} */}
    </>
  )
}
