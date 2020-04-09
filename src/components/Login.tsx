import {default as React, useState} from "react";
import {AsyncStorage, Button, Text, TextInput, TouchableHighlight, View} from "react-native";
import priests from "../data/priests";

function Login({ navigation }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [isLoginWrong, setLoginWrong] = useState(false);
    const [isPasswordWrong, setPasswordWrong] = useState(false);

    const back = () => {
        navigation.navigate('People');
    };

    const submit = async () => {
        const priest = priests.find((priest) => priest.login === login.toLowerCase());

        if (!priest) {
            setLoginWrong(true);

            if (password === '') {
                setPasswordWrong(true);
            }
        } else {
            if (priest.password === password) {
                setLoginWrong(false);
                setPasswordWrong(false);

                await AsyncStorage.setItem('isAuthorized', '1');
                await AsyncStorage.setItem('me', JSON.stringify({id: priest.id, name: priest.name}));

                navigation.navigate('People');
            } else {
                setLoginWrong(false);
                setPasswordWrong(true)
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFBF2' }}>
            <View style={{flexDirection: 'row', flexWrap:'wrap', marginTop: 22, padding: 15}}>
                <Text style={{ fontSize: 18, color: '#EBD1AD', fontWeight: 'normal' }} onPress={back}>Назад</Text>
            </View>
            <View style={{marginTop: 22, padding: 15, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                borderRadius: 5,
                backgroundColor: 'white',
                margin: 15,
            }}>
                <Text style={{fontSize: 28, fontWeight: 'bold'}}>Вход</Text>
                <View style={{marginTop: 20}}>
                    <View style={{marginBottom: 15}}>
                        <TextInput
                            style={[{ height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 15, fontSize: 16 }, isLoginWrong ? { borderColor: 'red' } : {}]}
                            onChangeText={setLogin}
                            placeholder={'Ваше имя'}
                        />
                        {isLoginWrong ? <Text style={{color: 'red'}}>Неверное имя пользователя</Text> : null}
                    </View>
                    <View>
                        <TextInput
                            secureTextEntry={true}
                            style={[{ height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 15, fontSize: 16 }, isPasswordWrong ? { borderColor: 'red' } : {}]}
                            onChangeText={setPassword}
                            placeholder={'Пароль'}
                        />
                        {isPasswordWrong ? <Text style={{color: 'red'}}>Неверный пароль</Text> : null}
                    </View>
                    <TouchableHighlight style={{marginTop: 10, backgroundColor: '#EBD1AD', borderRadius: 5, height: 50, paddingTop: 5}}>
                        <Button title={'Войти'} onPress={submit} color={'black'}></Button>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

export default Login;
