import React from 'react'
import Header from '../Layouts/Header'
import Menu from '../Layouts/Menu'
import Content from '../Layouts/Content'
import Footer from '../Layouts/Footer'
const Home = () => {
    return (
        <div className="wrapper">  
            <Menu />
            <Header />
            <Content />
            <Footer />
            </div>
    )
}

export default Home
