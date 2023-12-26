import React from 'react'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Popup, } from 'react-leaflet'
import { Icon } from 'leaflet'

import { mapService } from '../services/map.service'
import { StoreMarker } from './StoreMarker'
import store from '/store.png'


export function StoreMap() {
    const [storeData, setStoresData] = useState([])
    const [activeStore, setActiveStore] = useState(null)

    const storeIcon = new Icon({
        iconUrl: store,
        iconSize: [70, 80],
    })

    useEffect(() => {
        mapService.loadMap()
            .then((mapData) => {
                setStoresData(mapData.features)
            })
            .catch((error) => {
                console.error('Error loading map data:', error)
            })
    }, [])

    return (
        <MapContainer center={[31.668320, 34.783370]} zoom={9} style={{ width: '100%', height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {storeData.map((store) => (
                <StoreMarker
                    key={store.properties.PARK_ID}
                    store={store} icon={storeIcon}
                    setActiveStore={setActiveStore}
                />
            ))}

            {activeStore && (
                <Popup
                    position={[
                        activeStore.geometry.coordinates[1],
                        activeStore.geometry.coordinates[0],
                    ]}
                    onClose={() => {
                        setActiveStore(null);
                    }}
                >
                    <div>
                        <h2>{activeStore.properties.NAME}</h2>
                        <p>{activeStore.properties.DESCRIPTIO}</p>
                    </div>
                </Popup>
            )}
        </MapContainer>
    );
}
