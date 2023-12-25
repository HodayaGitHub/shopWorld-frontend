import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToToy }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <ToyPreview
                    key={toy._id}
                    toy={toy}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                    addToToy={addToToy}
                />
            )}
        </ul>
    )
}