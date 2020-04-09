import * as React from "react";
import {
    Alert,
    AsyncStorage,
    Image,
    ScrollView,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from "react-native";
import priests from "../data/priests";
import getMe from "../functions/getMe";
import isAuthorized from "../functions/isAuthorized";

class People extends React.Component {
    public props: any;
    public state = {
        isAuthorized: false,
        me: {id: 0, name: ''}
    };

    async componentDidMount() {
        this.setState({
            isAuthorized: await isAuthorized(),
            me: await getMe()
        });
    }

    login = () => {
        this.props.navigation.navigate('Login');
    };

    about = (priest) => {
        this.props.navigation.navigate('About', { priest: priest });
    };

    hardLogout = async () => {
        await AsyncStorage.removeItem('isAuthorized');
        await AsyncStorage.removeItem('me');
        this.setState({
            isAuthorized: false,
            me: {id: 0, name: ''}
        });
    };

    logout = async () => {
        Alert.alert(
            'Выйти',
            'Вы уверены?',
            [
                {text: 'Выйти', onPress: this.hardLogout},
                {text: 'Отмена', onPress: () => { return; }, style: 'cancel'},
            ],
            { cancelable: false }
        );
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFBF2' }}>
                <View style={{flexDirection: 'row', flexWrap:'wrap', marginTop: 22, padding: 15}}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Клирики</Text>
                    {!this.state.isAuthorized && <View style={{ marginRight: 15, marginTop: 6, flex: 1 }}>
                      <TouchableHighlight>
                        <Text style={{ fontSize: 18, color: '#EBD1AD', fontWeight: 'normal', textAlign: 'right' }} onPress={this.login}>Вход</Text>
                      </TouchableHighlight>
                    </View>}
                </View>
                {this.state.isAuthorized && <View style={{paddingLeft: 15, paddingBottom: 15}}>
                  <Text style={{ fontSize: 18 }}>Добро пожаловать, {this.state.me.name}</Text>
                  <TouchableHighlight><Text style={{ fontSize: 18, color: '#EBD1AD' }} onPress={this.logout}>Выйти</Text></TouchableHighlight>
                </View>}
                <ScrollView style={{padding: 15}}>
                    {priests.map((priest, key) => {
                        return <TouchableWithoutFeedback onPress={() => this.about(priest)}>
                            <View style={{flexDirection: 'row', marginBottom: 20}} key={key}>
                                <Image source={priest.img} style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 100,
                                    marginRight: 16
                                }}/>
                                <View style={{marginRight: 80}}>
                                    <Text style={{fontSize: 20}}>{priest.name}</Text>
                                    <Text style={{fontSize: 14, color: '#989898'}}>{priest.rang}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>;
                    })}
                </ScrollView>
            </View>
        );
    }
}

export default People;
