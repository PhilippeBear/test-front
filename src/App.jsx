import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { Vehicles } from './pages/Vehicles'
import { VehicleDetail } from './pages/VehicleDetail'

export const App = () => (
  // Un peu de layout a l'arrache mais bon
  <Box px={{ base: 4, lg: 24 }} py="4">
    <Router>
      <Routes>
        <Route path="/" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
      </Routes>
    </Router>
  </Box>
)
