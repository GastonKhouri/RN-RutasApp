import React, { useEffect, useRef, useState } from 'react';

import MapView, { Marker, Polyline } from 'react-native-maps';

import LoadingScreen from '../screens/LoadingScreen';
import { useLocation } from '../hooks';
import { Fab } from './Fab';

interface Props {
    markers?: Marker[];
}

export const Map = ( { markers }: Props ) => {

    const {
        hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const followingRef = useRef<boolean>( true );

    const [ showPolyline, setShowPolyline ] = useState( false );

    useEffect( () => {

        followUserLocation();

        return () => {
            stopFollowUserLocation();
        };

    }, [] );

    useEffect( () => {

        if ( !followingRef.current ) return;

        mapViewRef.current?.animateCamera( {
            center: userLocation,
            zoom: 17,
        } );

    }, [ userLocation ] );


    const centerPosition = async () => {

        const location = await getCurrentLocation();

        mapViewRef.current?.animateCamera( {
            center: location
        } );

        followingRef.current = true;

    };

    if ( !hasLocation ) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MapView
                ref={ el => mapViewRef.current = el! }
                style={ { flex: 1 } }
                // provider={ PROVIDER_GOOGLE }
                showsUserLocation
                showsMyLocationButton={ false }
                initialRegion={ {
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                } }
                onTouchStart={ () => followingRef.current = false }
            >

                {
                    showPolyline &&
                    <Polyline
                        coordinates={ routeLines }
                        strokeWidth={ 5 }
                        strokeColor={ 'blue' }
                    />
                }

                {/* <Marker
                    image={ require( '../assets/custom-marker.png' ) }
                    coordinate={ {
                        latitude: 37.78825,
                        longitude: -122.4324,
                    } }
                    title='Esto es un titulo'
                    description='Esto es un descripción'
                /> */}

            </MapView>

            <Fab
                iconName='compass-outline'
                onPress={ centerPosition }
                style={ {
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                } }
            />

            <Fab
                iconName='brush-outline'
                onPress={ () => setShowPolyline( p => !p ) }
                style={ {
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                } }
            />

        </>
    );
};