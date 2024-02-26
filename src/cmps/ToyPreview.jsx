import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)
    const fallbackImg = "https://res.cloudinary.com/drlt4yjnj/image/upload/v1708971776/myStore/toys/on_error.png"
    const navigate = useNavigate();


    function onClickDetails(){
       navigate(`/toy/details/${toy._id}`) 
    }
    return (
        <li className="toy-preview" key={toy._id}>

            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
            </Link>

                <div className="img-container" onClick={onClickDetails}>
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
                    <button className='details-btn' onClick={onClickDetails}> Details</button>
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
