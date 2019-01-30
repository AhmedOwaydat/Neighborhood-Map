/* eslint-disable no-undef */
import React from "react"
import { compose, withProps, withStateHandlers, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = compose(
    withStateHandlers(() => ({
      isOpen: false,
      }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDqoV1PE_IufX2c-VAfmWcDKcFgpf751eQ&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: window.innerHeight }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo })
        console.log('a7aaaaaaaaaaa', error, info);
      },
      componentDidMount() {
        /*let geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': 'Bakerstreet, 2'}, function(results, status) {
          if (status == 'OK') {
            console.log('here result of geocoder', results);
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });*/
      }
    }),
  )((props) => (
    
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 29.9852687, lng: 31.1320132 }}
  >
    {
      props.searchList.map((Location) =>
      //put the locations marker
      <Marker
        key={Location.id}
        position={Location.location} 
        onClick={(event) => {props.onMarkerClick(Location)} }
        defaultAnimation={google.maps.Animation.BOUNCE}
      >
      
      {//show InfoWindow to selected location
        (props.clickedID === Location.id) && (<InfoWindow onCloseClick={props.onToggleOpen}>
          <div tabIndex={Location.id+6} className='InfoWindow'>{Location.Info}</div>
        </InfoWindow>)
      }
      </Marker>
      )
    }
  </GoogleMap>
))

export default MyMapComponent;