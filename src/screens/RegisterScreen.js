import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import api from '../services/api';

const RegisterScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            await api.post('/auth/register', { name, email, address, password });
            Alert.alert('Registration successful');
            props.navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Registration failed', error.response.data.message);
        }
    };

    return (
        <View>
            <Text>Name</Text>
            <TextInput value={name} onChangeText={setName} />
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Address</Text>
            <TextInput value={address} onChangeText={setAddress} />
            <Text>Password</Text>
            <TextInput secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Register" onPress={registerUser} />
        </View>
    );
};

export default RegisterScreen;
