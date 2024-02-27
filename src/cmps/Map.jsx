import React from 'react'
import GoogleMapReact from 'google-map-react'
import { useState } from 'react'
import { Tooltip } from 'react-tooltip'




export function Map() {

  // dotenv.config()
  const API_KEY = import.meta.env.REACT_APP_GOOGLE_MAP_API 

  const [center, setCenter] = useState({ lat: 31.7139892578125, lng: 34.98474884033203 })
  const zoom = 10
  const branches = [
    {
      city: 'Holon',
      id: 101,
      position: {
        lat: 32.01034,
        lng: 34.77918,
      },
      address: 'Holon, Israel',

    },
    {
      city: 'Hadera',
      id: 102,
      position: {
        lat: 31.668320,
        lng: 34.783370,
      },
      address: 'Hadera, Israel',
    },
    {
      city: 'Tel Aviv',
      id: 103,
      position: {
        lat: 32.054110,
        lng: 34.757060,
      },
    },
  ]


  function CustomMarker({  address }) {
    return (
      <div data-tip={address} style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <img src="./store.png" alt="Custom Marker" style={{ height: '60px', width: '50px' }} />
      </div>
    );
  }

  return (
    <div>
      {branches.map((branch) => {
        return (
          <button key={branch.city} onClick={() => setCenter(branch.position)}>
            {branch.city}
          </button>
        )
      })}
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={center}
          defaultZoom={zoom}>

          {branches.map((branch) => (

            <CustomMarker
              lat={branch.position.lat}
              lng={branch.position.lng}
              key={branch.id}
              address={branch.address}
            />
          ))}

        </GoogleMapReact>
      </div>
    </div>
  )
}
