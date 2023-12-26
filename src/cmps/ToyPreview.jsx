import { Link } from "react-router-dom"

// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy }) {

    return (
        <li className="toy-preview" key={toy._id}>

            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
                <h1>🚁</h1>
            </Link>

            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <div>
                <button onClick={() => {
                    onRemoveToy(toy._id)
                }}>x</button>
                <button onClick={() => {
                    onEditToy(toy)
                }}>Edit</button>
            </div>
        </li>
    )
}
