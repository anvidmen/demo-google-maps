import { useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  GoogleMap, useJsApiLoader, Marker, InfoWindow
} from '@react-google-maps/api'
import { formatRelative } from 'date-fns'
import SearchBox from 'components/SearchBox/SearchBox'

const libraries = ['places']
const mapContainerStyle = {
  height: '100vh',
  width: '100vw'
}
const options = {
  styles: undefined,
  disableDefaultUI: true,
  zoomControl: true
}
const center = {
  lat: 41.4257,
  lng: 2.1037
}

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const { markers } = useSelector((state) => state.markers)

  const [selected, setSelected] = useState(null)

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return 'Error'
  if (!isLoaded) return 'Loading...'

  return (
    <div>
      <SearchBox />
      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
            icon={undefined}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>
                <span role='img' aria-label='bear'>
                    📌
                </span>{' '}
                {selected.address}
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}

export default Map
