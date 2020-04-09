import {AsyncStorage} from "react-native";
import isAuthorized from "./isAuthorized";

const getMe = async () => {
    const isAuth = await isAuthorized();

    if (isAuth) {
        const meJson = await AsyncStorage.getItem('me');
        return typeof meJson === 'string' ? JSON.parse(meJson) : {id: 0, name: ''};
    }
};

export default getMe;
