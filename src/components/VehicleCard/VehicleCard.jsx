import { Box, Flex, HStack, Icon, Tag, Text } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'

import { tagColors } from '../../constants/tagColors'

export const VehicleCard = ({ vehicle, isMobile }) => {
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

  if (isMobile) {
    return (
      <Flex
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.200"
        boxShadow="sm"
        my="4"
        p="4"
        as={Link}
        to={`/vehicles/${vehicle.id}`}
        w="full"
        transition="0.2s ease"
        color="gray.600"
        _hover={{
          borderColor: 'primary.500',
          color: 'gray.800'
        }}
      >
        <Flex flexDir="column" w="full" justifyContent="space-between">
          <Flex flexDir="row" w="full" justifyContent="space-between">
            <Flex>
              <Text fontSize="sm" fontWeight="bold">
                {vehicle.make_and_model}
                <Tag
                  ml="2"
                  size="sm"
                  variant={renderVariant(vehicle.color)}
                  colorScheme={tagColors[vehicle.color]}
                >
                  {vehicle.color}
                </Tag>
              </Text>
            </Flex>
            <Flex alignItems="flex-start">
              <Tag size="sm">#{vehicle.id}</Tag>
            </Flex>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="4"
            flexDir="row"
          >
            <Text fontSize="sm">
              {`${vehicle.doors} door${vehicle.doors > 1 ? 's' : ''}`} -{' '}
              {vehicle.mileage} miles
            </Text>
            <Icon color="gray.600" as={AiOutlineArrowRight} />
          </Flex>
        </Flex>
      </Flex>
    )
  }
  return (
    <Flex
      as={Link}
      to={`/vehicles/${vehicle.id}`}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      p="4"
      background="white"
      transition="0.2s ease"
      color="gray.800"
      _hover={{
        background: 'gray.50',
        textDecoration: 'none',
        color: 'secondary.500'
      }}
    >
      <Flex alignItems="center" w="10rem">
        <Tag size="sm">{vehicle.id}</Tag>
      </Flex>
      <HStack w="full">
        <Text fontWeight="bold">{vehicle.make_and_model} </Text>
        <Tag
          variant={renderVariant(vehicle.color)}
          colorScheme={tagColors[vehicle.color]}
        >
          {vehicle.color}
        </Tag>
      </HStack>
      <Box w="20rem" textAlign="right">
        {vehicle.doors}
      </Box>
      <Box w="20rem" textAlign="right">
        {vehicle.mileage}
      </Box>
      <Flex justifyContent="flex-end" w="10rem" alignItems="center">
        <Icon as={FiChevronRight} />
      </Flex>
    </Flex>
  )
}
