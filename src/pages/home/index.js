import React from 'react';
import './index.css';
import Navbar from '../../components/layout/Navbar/index'
import Banner from '../../components/layout/BannerHomePage/index'
import SearchInClass from '../../components/layout/SearchInClass/index'
import Footer from '../../components/layout/Footer/index'


function HomePage() {

    return(
        <>
        <Navbar/>
        <Banner/>
        <SearchInClass/>
        <Footer/>
        </>
       
    )
}

export default HomePage;