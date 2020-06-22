import { StyleSheet } from 'react-native';
import {getColors as colors} from '../styles/colors';

const global = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    loading: {
        flex:1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
    },
})

export {global};