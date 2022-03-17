import { Box, Flex, HStack, Link, Tag, Text } from '@chakra-ui/react'
import { tagColors } from '../../constants/tagColors'

export const VehicleCard = ({ vehicle }) => {
  const renderVariant = (color) => {
    if (color === 'White') {
      return 'outline'
    }
    if (color === 'Black') {
      return 'solid'
    }
    return 'subtle'
  }
  return (
    <Flex
      as={Link}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      p="4"
      background="white"
      _hover={{
        background: 'gray.50',
        textDecoration: 'none'
      }}
    >
      <Flex alignItems="center" w="10rem">
        <Tag size="sm">{vehicle.id}</Tag>
      </Flex>
      <HStack w="full">
        <Text color="gray.800" fontWeight="bold">
          {vehicle.make_and_model}{' '}
        </Text>
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
    </Flex>
  )
}
