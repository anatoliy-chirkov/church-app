import {AsyncStorage} from "react-native";

const isAuthorized = async () => {
    const auth = await AsyncStorage.getItem('isAuthorized');

    return auth === '1';
};

export default isAuthorized;
