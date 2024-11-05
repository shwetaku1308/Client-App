import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import api from '../services/api';

const MenuScreen = ({ route, navigation }) => {
    const { restaurantId } = route.params;
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await api.get(`/restaurants/${restaurantId}/menu`);
            setMenu(response.data.menu);
        };
        fetchMenu();
    }, [restaurantId]);

    const addItemToOrder = (item) => {
        setOrder([...order, item]);
    };

    const placeOrder = async () => {
        try {
            await api.post('/orders', { restaurant: restaurantId, items: order });
            Alert.alert('Order placed successfully!');
            navigation.navigate('RestaurantList');
        } catch (error) {
            Alert.alert('Order failed', error.message);
        }
    };

    return (
        <View>
            <FlatList
                data={menu}
                keyExtractor={(item) => item.item}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.item}</Text>
                        <Text>{item.price}</Text>
                        <Button title="Add to Order" onPress={() => addItemToOrder(item)} />
                    </View>
                )}
            />
            <Button title="Place Order" onPress={placeOrder} />
        </View>
    );
};

export default MenuScreen;
