import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

    const fallbackImg = "https://res.cloudinary.com/drlt4yjnj/image/upload/v1708971776/myStore/toys/on_error.png"

    return (
        <li className="toy-preview" key={toy._id}>

            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
            </Link>

            <div className="img-container">
                <img className="toy-img"
                    src={toy.imgSrc || fallbackImg}
                    alt={toy.title}
                    onError={event => {
                        event.target.src = { fallbackImg }
                        event.onerror = null
                    }}
                />
            </div>

            <span className="toy-price">Price: <span>${toy.price.toLocaleString()}</span></span>

            <div className="actions-btns-container">
                <button> <Link className='details-btn' to={`/toy/details/${toy._id}`}>Details</Link></button>
                {loggedinUser && loggedinUser.isAdmin &&
                    <>
                        <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                        <button onClick={() => { onEditToy(toy) }}>Edit</button>
                    </>
                }
            </div>
        </li>
    )
}
