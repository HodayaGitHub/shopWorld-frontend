// import { useMap } from 'react-leaflet';
// import { Marker, Popup, useMap } from 'react-leaflet'

export function StoreLocations({ store }) {
    const map = useMap()

    function handleMoveToLocation() {
        map.setView(
            [
                store.geometry.coordinates[1],
                store.geometry.coordinates[0],
            ],
            14
        )
    }





    return (
        // <React.Fragment>

        <div>
            {/* <h3>{store.properties.NAME}</h3>
            <p>{store.properties.DESCRIPTION}</p> */}
            <button className="map-button" onClick={() => map.panTo([store.geometry.coordinates[1], store.geometry.coordinates[0]])}>
               {store.properties.NAME}
            </button>
        </div>
        // </React.Fragment>
    );
}
