import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../services/api';

const RestaurantListScreen = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await api.get('/restaurants');
            setRestaurants(response.data);
        };
        fetchRestaurants();
    }, []);

    return (
        <View>
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Menu', { restaurantId: item._id })}>
                        <Text>{item.name}</Text>
                        <Text>{item.address}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default RestaurantListScreen;
