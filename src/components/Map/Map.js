import { useState, useCallback, useRef } from 'react'
import {
  GoogleMap, useJsApiLoader, Marker, InfoWindow
} from '@react-google-maps/api'
import { formatRelative } from 'date-fns'
import SearchBox from 'components/SearchBox/SearchBox'
import Locate from 'components/Locate/Locate'

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

  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date()
      }
    ])
  }, [])

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(15)
  }, [])

  if (loadError) return 'Error'
  if (!isLoaded) return 'Loading...'

  return (
    <div>
      <Locate panTo={panTo} />
      <SearchBox panTo={panTo} />

      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
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
                Alert
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
