// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux
// import { useDispatch, useSelector } from "react-redux"
import toyStoryLogoUrl from '../../public/toy-story-logo.png?url'


export function HomePage() {
    
    return (
        <section>
            <h2>
             welcome to home page
             </h2>
             <img src={toyStoryLogoUrl} alt="Toy Story Logo" />
        </section >
    )
}