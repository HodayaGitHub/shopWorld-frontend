
import React from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'

export function StoreMarker({ store, icon , handleMoveToLocation}) {
    const map = useMap()


    return (
        <React.Fragment>
            <Marker
                position={[
                    store.geometry.coordinates[1],
                    store.geometry.coordinates[0],
                ]}
                icon={icon}
                onClick={() => {
                    map.setView(
                        [
                            store.geometry.coordinates[1],
                            store.geometry.coordinates[0],
                        ],
                        14
                    );
                }}
            >
                <Popup>
                    <div>
                        <h2>{store.properties.NAME}</h2>
                        <p>{store.properties.DESCRIPTIO}</p>
                    </div>
                </Popup>
            </Marker>


        </React.Fragment>
    );

}