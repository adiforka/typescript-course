import axios from 'axios'
import Map from 'ol/Map'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'

const form = document.querySelector('#address-form')!
const addressInput = document.querySelector('#address')! as HTMLInputElement

function searchAdressHandler(event: Event) {
  // this prevents automatic form submission on submit. we want to grab some data
  // from there for the ts code here
  event.preventDefault()
  // this remains unused but we'd use it to put in a query string of a get request 
  // to a geolocator to get the coordinates
	const enteredAddress = addressInput.value

  // cannot actually fetch coordinates from open layers
  // hardcoding wro coordinates
  const coordinates = { lat: 51.1079, lng: 17.0385 }
  // clearing input from map div
	document.querySelector('#map')!.innerHTML = ''
	new Map({
    // this says where to render the map
		target: 'map',
		layers: [
			new Tile({
				source: new OSM()
			})
		],
		view: new View({
			center: fromLonLat([coordinates.lng, coordinates.lat]),
			zoom: 16
		})
	})
}

form.addEventListener('submit', searchAdressHandler)
