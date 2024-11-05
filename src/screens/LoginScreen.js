import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            navigation.replace('RestaurantList');
        } catch (error) {
            Alert.alert('Login failed', error.response.data.message);
        }
    };

    return (
        <View>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Password</Text>
            <TextInput secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Login" onPress={loginUser} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default LoginScreen;
