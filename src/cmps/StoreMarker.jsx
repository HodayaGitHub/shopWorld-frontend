
import { Marker, Popup, useMap } from 'react-leaflet'

export function StoreMarker({ store, icon, setActiveStore }) {
    const map = useMap();


    const handleClick = () => {
        setActiveStore(store);
        map.flyTo(
            [
                store.geometry.coordinates[1],
                store.geometry.coordinates[0],
            ],
            14
        )
    }



    return (
        <Marker
            position={[
                store.geometry.coordinates[1],
                store.geometry.coordinates[0],
            ]}
            icon={icon}
            onClick={handleClick}
        />
    )
}