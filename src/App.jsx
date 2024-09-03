import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchResults from './Components/SearchResults.jsx'
import SingleMovie from './Components/SingleMovie.jsx'
import Tvshows from './Components/Tvshows'
import Home from './Components/Home.jsx'
import HeaderMovies from './Components/HeaderMovies.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>} ></Route>
                <Route path="/search/:searchTerm" element={<SearchResults/>} ></Route>
                <Route path="/singleItem/:id" element={<SingleMovie />}></Route>
                <Route path="/tvshows" element={<Tvshows />}></Route>
                <Route path="/movies" element={<HeaderMovies />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>

    )
}

export default App