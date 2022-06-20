import { View } from 'react-native';
import React from 'react';

import { Map } from '../components';

const MapScreen = () => {
    return (
        <View style={ { flex: 1 } }>
            <Map />
        </View>
    );
};

export default MapScreen;