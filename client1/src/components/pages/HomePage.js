import React from 'react'
import MainCarosel from '../HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../HomeSectionCarosel/HomeSectionCarosel'
import { mens_kurta } from '../../Data/images'
import Footer from '../Footer/Footer'

const HomePage = () => {
  return (
    <div>
        <MainCarosel/>

        <div className='space-y-10 py-20 flex flex-col justify-center px-10'>
            <HomeSectionCarosel data={mens_kurta} sectionName={"One Piece"}/>
            <HomeSectionCarosel data={mens_kurta} sectionName={"DragonBall Z"}/>
            <HomeSectionCarosel data={mens_kurta} sectionName={"Coding"}/>
            <HomeSectionCarosel data={mens_kurta} sectionName={"Hell"}/>
            <Footer/>
            
            
        </div>
    </div>
  )
}

export default HomePage