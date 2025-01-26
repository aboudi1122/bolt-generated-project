import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Converter from './components/Converter'
import History from './components/History'
import Favorites from './components/Favorites'
import Navbar from './components/Navbar'

const API_BASE = 'https://api.frankfurter.app'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_BASE}/currencies`)
        setCurrencies(Object.entries(response.data))
      } catch (error) {
        console.error('Error fetching currencies:', error)
      }
    }
    fetchCurrencies()
  }, [])

  const addFavorite = (pair) => {
    const newFavorites = [...favorites, pair]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const removeFavorite = (pair) => {
    const newFavorites = favorites.filter(fav => fav !== pair)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  return (
    &lt;BrowserRouter&gt;
      &lt;div className="min-h-screen flex flex-col"&gt;
        &lt;Navbar /&gt;
        &lt;Routes&gt;
          &lt;Route path="/" element={
            &lt;Converter 
              currencies={currencies} 
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            /&gt;
          } /&gt;
          &lt;Route path="/history" element={
            &lt;History currencies={currencies} /&gt;
          } /&gt;
          &lt;Route path="/favorites" element={
            &lt;Favorites 
              favorites={favorites}
              removeFavorite={removeFavorite}
            /&gt;
          } /&gt;
        &lt;/Routes&gt;
      &lt;/div&gt;
    &lt;/BrowserRouter&gt;
  )
}

export default App
