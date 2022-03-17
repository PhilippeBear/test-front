/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Tag,
  Text
} from '@chakra-ui/react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'
import { IllustrationError } from '../../components/illustrations'
import { getVehicle } from '../../services/vehicles'
import { tagColors } from '../../constants/tagColors'

export const VehicleDetail = () => {
  const [currentVehicle, setCurrentVehicle] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  // on pourrait le sortir dans un utils
  const renderVariant = (color) => {
    if (color === 'White') {
      return 'outline'
    }
    if (color === 'Black') {
      return 'solid'
    }
    return 'subtle'
  }

  const fetchCar = async () => {
    setIsLoading(true)
    // j'ai utilisé l'id mais on aurait aussi pu avoir l'uid a la place
    const data = await getVehicle(id)
    if (data?.status === 404) {
      setIsError(true)
    } else {
      // vu qu'on a un tableau, on devrait spread pour imiter l'objet qui aurait pu être retourné
      setCurrentVehicle(...data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCar()
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
        <Flex mt="8">
          <Button as={Link} to="/">
            Back to home
          </Button>
          <Button
            ml="4"
            colorScheme="primary"
            onClick={() => location.reload()}
          >
            Reload
          </Button>
        </Flex>
      </Flex>
    )
  }

  return (
    <Box>
      <HStack>
        <IconButton icon={<FiChevronLeft />} onClick={() => navigate('/')} />
        <Heading as="h1" size="md">
          {currentVehicle.make_and_model}
        </Heading>
        <Tag
          variant={renderVariant(currentVehicle.color)}
          colorScheme={tagColors[currentVehicle.color]}
        >
          {currentVehicle.color}
        </Tag>
      </HStack>
    </Box>
  )
}
