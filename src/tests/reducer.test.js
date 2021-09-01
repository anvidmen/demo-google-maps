/* eslint-env jest */
import markersReducers from '../reducers/markersReducer'
import { addMarker } from '../actions/index'

test('should return the initial state', () => {
  expect(markersReducers(undefined, {})).toEqual(
    {
      markers: []
    }
  )
})

test('should handle a marker being added to an empty list', () => {
  const previousState = { markers: [] }
  const time = new Date()
  expect(markersReducers(previousState, addMarker({ address: 'address', lat: 42.444, lng: 11.222, time }))).toEqual(
    {
      markers: [
        { address: 'address', lat: 42.444, lng: 11.222, time }
      ]
    }
  )
})

test('should handle a marker being added to an existing list', () => {
  const time = new Date()
  const previousState = {
    markers: [
      { address: 'address', lat: 42.444, lng: 11.222, time }
    ]
  }
  const timeTwo = new Date()
  expect(markersReducers(previousState, addMarker({ address: 'address2', lat: 41.444, lng: 1.222, timeTwo }))).toEqual(
    {
      markers: [
        { address: 'address', lat: 42.444, lng: 11.222, time },
        { address: 'address2', lat: 41.444, lng: 1.222, timeTwo }
      ]
    })
})
