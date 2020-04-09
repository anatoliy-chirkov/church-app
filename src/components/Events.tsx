import * as React from "react";
import {AsyncStorage, Button, ScrollView, Text, TouchableHighlight, TouchableWithoutFeedback, View} from "react-native";
import isAuthorized from "../functions/isAuthorized";

class Events extends React.Component<any, any>
{
    public state = {
        openDayIndexes: [],
        isAuthorized: false
    };

    private readonly firstday: Date;
    private lastday: Date;
    private date: Date;
    private days: Array<object> = [];

    constructor(props: {navigation: any}) {
        super(props);

        const curr = new Date;
        const first = curr.getDate() - curr.getDay();
        const last = first + 6;

        this.firstday = new Date(curr.setDate(first));
        this.lastday = new Date(curr.setDate(last));
        this.date = new Date();
    }

    async componentDidMount() {
        this.days = await this.getDays();
        this.setState({
            isAuthorized: await isAuthorized()
        });
    }

    getWeekName = () => {
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

        return `${this.firstday.getDate()} ${months[this.firstday.getMonth()]} - ${this.lastday.getDate()} ${months[this.lastday.getMonth()]} ${this.date.getFullYear()} года`;
    };

    getStorageDateKey = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };

    getDays = async () => {
        const weekDays = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];
        let days: Array<object> = [];
        let currentDay: Date = new Date(this.firstday);

        for (let i = 1; i <= 7; i++) {
            const storedEventsForThisDay = await AsyncStorage.getItem(this.getStorageDateKey(currentDay));
            let events: Array<object> = [];

            if (storedEventsForThisDay) {
                events = JSON.parse(storedEventsForThisDay);
            }

            days.push({
                name: `${currentDay.getDate()} ${weekDays[currentDay.getDay()]}`,
                events: events
            });

            currentDay.setDate(currentDay.getDate() + 1);
        }

        return days;
    };

    addNewEvent = () => {
        this.props.navigation.navigate('Add');
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFBF2' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 22, padding: 15, paddingBottom: 5 }}>Расписание богослужений на неделю</Text>
                <Text style={{paddingLeft: 15, paddingBottom: 15, fontSize: 16}}>{this.getWeekName()}</Text>

                {this.state.isAuthorized &&
                    <TouchableHighlight style={{backgroundColor: '#EBD1AD', borderRadius: 5, height: 50, marginLeft: 15, marginRight: 15, marginBottom: 16, paddingTop: 5}}>
                      <Button title={'Добавить'} onPress={this.addNewEvent} color={'black'}></Button>
                    </TouchableHighlight>
                }

                <ScrollView>
                    {this.days.map((day: {name: string, events: Array<{priest: string, time: string, event: string}>}, key) => {
                        return <TouchableWithoutFeedback onPress={() => {
                            const openDayIndexes = this.state.openDayIndexes;

                            if (openDayIndexes.includes(key)) {
                                const index = openDayIndexes.indexOf(key);
                                openDayIndexes.splice(index, 1);
                            } else {
                                openDayIndexes.push(key);
                            }

                            this.setState({openDayIndexes: openDayIndexes})
                        }}>
                            <View style={{
                                marginLeft: 15,
                                borderColor: '#EBD1AD',
                                borderWidth: 1,
                                marginRight: 15,
                                marginBottom: 14,
                                padding: 24,
                                borderRadius: 5
                            }} key={key}>
                                <Text style={[{ fontSize: 18, fontWeight: 'bold' }, key === 0 ? {color: 'red'} : {}]}>{day.name}</Text>
                                {this.state.openDayIndexes.includes(key) &&
                                <View style={{paddingTop: 24}}>
                                    {day.events.length === 0 && <Text style={{ fontSize: 14}}>Нет службы</Text>}

                                    {day.events.map((event) => {
                                        return <Text style={{fontSize: 14}}>{`${event.time}${event.event === '' ? '' : ', ' + event.event} - ${event.priest}`}</Text>;
                                    })}
                                </View>
                                }
                            </View>
                        </TouchableWithoutFeedback>;
                    })}
                </ScrollView>
            </View>
        );
    }
}

export default Events;
