import React from 'react'
import {
  Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

const SearchBox = ({ panTo }) => {
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
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng })
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
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default SearchBox
