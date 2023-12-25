import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { HomePage } from './pages/HomePage.jsx'

import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { AboutUs } from './pages/AboutUs.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<AboutUs />} path="/about" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


