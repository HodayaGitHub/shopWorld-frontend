import React from 'react'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'

import { mapService } from '../services/map.service'
import { StoreMarker } from './StoreMarker'
import store from '/store.png'


export function StoreMap() {
    const [storeData, setStoresData] = useState([])

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

    function handleMoveToLocation(location) {
        map.setView(location, 14);
      }

    return (
        <React.Fragment>
            <MapContainer
                center={[31.668320, 34.783370]}
                zoom={9}
                style={{ width: '100%', height: '100%' }}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {storeData.map((store) => (
                    <StoreMarker
                        key={store.properties.PARK_ID}
                        store={store}
                        icon={storeIcon}
                        onclose={onclose}
                        handleMoveToLocation={handleMoveToLocation}
                    />
                )
                )}
            </MapContainer>
     


        </React.Fragment>

    )
}
