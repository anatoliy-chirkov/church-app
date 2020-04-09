import {default as React, SyntheticEvent, useState} from "react";
import {AsyncStorage, Button, Picker, ScrollView, Text, TextInput, TouchableHighlight, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import getMe from "../functions/getMe";

class AddNewEvent extends React.Component<any, any>
{
    public props: any;
    public state = {
        date: new Date,
        time: new Date,
        event: 'Нет',
        me: {id: 0, name: ''},
        showCalendar: false,
        showTime: false,
        showEvents: false
    };

    async componentDidMount() {
        this.setState({...this.state, me: await getMe()})
    }

    back = () => {
        this.props.navigation.navigate('Events');
    };

    submit = async () => {
        const dateKey = `${this.state.date.getFullYear()}-${this.state.date.getMonth()}-${this.state.date.getDate()}`;
        let wantBeStored = [];

        const storedOnThisDay = await AsyncStorage.getItem(dateKey);

        if (storedOnThisDay) {
            wantBeStored = JSON.parse(storedOnThisDay);

            const existent = wantBeStored.findIndex((event) => event.priest === this.state.me.name);
            wantBeStored.splice(existent, 1);
        }

        wantBeStored.push({
            priest: this.state.me.name,
            time: `${this.state.time.getHours()}:${this.state.time.getMinutes()}`,
            event: this.state.event === 'Нет' ? '' : event
        });

        await AsyncStorage.setItem(dateKey, JSON.stringify(wantBeStored));

        this.props.navigation.navigate('Events');
    };

    render() {
        const months = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря'
        ];

        return (
            <View style={{ flex: 1, backgroundColor: '#FFFBF2' }}>
                <View style={{flexDirection: 'row', flexWrap:'wrap', marginTop: 22, padding: 15}}>
                    <Text style={{ fontSize: 18, color: '#EBD1AD', fontWeight: 'normal' }} onPress={this.back}>Назад</Text>
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
                    <Text style={{fontSize: 28, fontWeight: 'bold'}}>Добавление службы</Text>
                    <ScrollView style={{marginTop: 20}}>
                        <View style={{marginBottom: 15}}>
                            <TextInput
                                style={{ backgroundColor: '#EDEDED', color: '#909090', height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 15, fontSize: 16 }}
                                value={this.state.me.name}
                                editable={false}
                            />
                        </View>
                        <View style={[{marginBottom: 15, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 15}, !this.state.showCalendar ? {height: 50} : {}]}>
                            <Text
                                style={{ backgroundColor: '#fff', color: '#000', fontSize: 16 }}
                                onPress={(e) => this.setState({...this.state, showCalendar: !this.state.showCalendar })}
                            >{`${this.state.date.getDate()} ${months[this.state.date.getMonth()]} ${this.state.date.getFullYear()}`}</Text>
                            {this.state.showCalendar &&
                                <DateTimePicker
                                  testID="datePicker"
                                  timeZoneOffsetInMinutes={180}
                                  minimumDate={new Date}
                                  value={this.state.date}
                                  onChange={(e) => {
                                      const date = new Date();
                                      date.setTime(e.nativeEvent.timestamp);
                                      this.setState({...this.state, date: date});
                                  }}
                                  mode={'date'}
                                  display="default"
                                  locale={'ru'}
                                />
                            }
                        </View>
                        <View style={[{marginBottom: 15, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 15}, !this.state.showTime ? {height: 50} : {}]}>
                            <Text
                                style={{ backgroundColor: '#fff', color: '#000', fontSize: 16 }}
                                onPress={(e) => this.setState({...this.state, showTime: !this.state.showTime})}
                            >{`${this.state.time.getHours()}:${this.state.time.getMinutes()}`}</Text>
                            {this.state.showTime &&
                                <DateTimePicker
                                  testID="timePicker"
                                  timeZoneOffsetInMinutes={180}
                                  value={this.state.time}
                                  onChange={(e) => {
                                      const time = new Date();
                                      time.setTime(e.nativeEvent.timestamp);
                                      this.setState({...this.state, time: time});
                                  }}
                                  mode={'time'}
                                  is24Hour={true}
                                  display="default"
                                  locale={'ru'}
                                />
                            }
                        </View>
                        <View style={[{marginBottom: 15, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 15}, !this.state.showEvents ? {height: 50} : {}]}>
                            <Text
                                style={{ backgroundColor: '#fff', color: '#000', fontSize: 16 }}
                                onPress={(e) => this.setState({...this.state, showEvents: !this.state.showEvents})}
                            >{this.state.event === 'Нет' ? 'Богослужения из суточного круга' : this.state.event}</Text>
                            {this.state.showEvents &&
                                <Picker
                                  selectedValue={this.state.event}
                                  onValueChange={(itemValue, itemIndex) => this.setState({...this.state, event: itemValue})}
                                >
                                  <Picker.Item label="Нет" value="Нет" />
                                  <Picker.Item label="Утреня" value="Утреня" />
                                  <Picker.Item label="Вечерня" value="Вечерня" />
                                  <Picker.Item label="Часы" value="Часы" />
                            </Picker>
                            }
                        </View>
                        <TouchableHighlight style={{marginTop: 10, backgroundColor: '#EBD1AD', borderRadius: 5, height: 50, paddingTop: 5}}>
                            <Button title={'Добавить'} onPress={this.submit} color={'black'}></Button>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default AddNewEvent;
