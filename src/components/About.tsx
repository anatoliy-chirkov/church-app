import {Image, ScrollView, Text, View} from "react-native";
import * as React from "react";

function About({ state, descriptors, navigation, route }) {
    const back = () => {
        navigation.navigate('People');
    };

    const priest = route.params.priest;

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFBF2' }}>
            <View style={{flexDirection: 'row', flexWrap:'wrap', marginTop: 22, padding: 15}}>
                <Text style={{ fontSize: 18, color: '#EBD1AD', fontWeight: 'normal' }} onPress={back}>Назад</Text>
            </View>
            <ScrollView>
                <View style={{flexDirection: 'row', marginBottom: 20, marginLeft: 15, marginTop: 14, marginRight: 45}}>
                    <Image source={priest.img} style={{
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        marginRight: 20
                    }}/>
                    <View style={{marginRight: 60}}>
                        <Text style={{fontSize: 20}}>{priest.name}</Text>
                        <Text style={{fontSize: 14, color: '#989898'}}>{priest.rang}</Text>
                    </View>
                </View>
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                    <Text style={{fontSize: 14}}>{priest.about}</Text>
                </View>
                <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 22, padding: 15 }}>Расписание богослужений</Text>
            </ScrollView>
        </View>
    );
}

export default About;
