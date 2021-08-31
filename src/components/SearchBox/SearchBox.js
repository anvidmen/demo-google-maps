import { useDispatch } from 'react-redux'
import {
  Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { addMarker } from 'actions/index'

const SearchBox = () => {
  const dispatch = useDispatch()

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 41.2257, lng: () => 2.1037 },
      radius: 100 * 1000
    }
  })

  const handleInput = (e) => setValue(e.target.value)

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const result = results[0]
      const { lat, lng } = await getLatLng(result)
      const marker = { address: result.formatted_address, lat: lat, lng: lng, time: new Date() }

      dispatch(addMarker(marker))
    } catch (error) {
      throw new Error('Error:', error)
    }
  }

  return (
    <div className='search'>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder='Search places'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id: id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default SearchBox
