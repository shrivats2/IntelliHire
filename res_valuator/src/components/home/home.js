import React from 'react'
import Header from './home-components/header'
import AboutIntellihire from './home-components/aboutintellihire'
import Service from './home-components/service'
import CTA from './home-components/cta'
import Footer from './home-components/footer'

const Home = () => {
  return (
    <>
    <div className="gradient__bg_header">
      <Header/>
    </div>
    <AboutIntellihire/>
    <Service/>
    <CTA/>
    <Footer/>
    </>
  )
}

export default Home
