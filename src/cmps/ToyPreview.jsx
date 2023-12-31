import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

    console.log('loggedinUser', loggedinUser)
    return (
        <li className="toy-preview" key={toy._id}>

            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
            </Link>

            <div className="img-container">
                <img className="toy-img"
                    src={`/images/toys/${toy.imageFilename}.png`}
                    alt={toy.name}
                />
            </div>

            <span className="toy-price">Price: <span>${toy.price.toLocaleString()}</span></span>

            {loggedinUser  && loggedinUser.isAdmin &&
                <div className="actions-btns-container">
                    <button onClick={() => {
                        onRemoveToy(toy._id)
                    }}>x</button>
                    <button onClick={() => {
                        onEditToy(toy)
                    }}>Edit</button>
                </div>
            }
        </li>
    )
}
