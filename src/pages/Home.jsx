import React from 'react'
import Hero from '../components/Hero/Hero'
import GlobalRoute from '../components/GlobalRouteMap/GlobalRoute'
import ServicesEcosystem from '../components/Services/ServicesEcosystem'
import GPSPhilosophy from '../components/GPSPhilosophy'
import TimeBasedService from '../components/TimeBasedService'

export default function Home() {
  return (
    <div>
        <Hero/>
        <GlobalRoute/>
        <ServicesEcosystem/>
        <GPSPhilosophy/>
        <TimeBasedService/>
    </div>
  )
}
