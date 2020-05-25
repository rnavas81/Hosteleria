import React from 'react';
import { 
    Text,
    TouchableOpacity,
    SectionList,
    Image,
    StyleSheet,
    View,
} from 'react-native';

import {getColors as colors} from '../styles/colors';
import {globalStyle} from '../styles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HR from './HR';

const labels={
    products:'Productos en carta...',
    menus:'Menús disponibles...'
}
const CategoryList = ({
    categories,onDelete,onEdit
}) => {

    renderItem = category => (
        <View  key={category.id} style={styles.listItem}>
            <TouchableOpacity style={[styles.roundButton,styles.delete]}
                onPress={()=>onDelete(category)}>
                <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.textItem} >{category.name}</Text>
            <TouchableOpacity style={[styles.roundButton,styles.edit]}
                onPress={()=>onEdit(category)}>
                <Icon style={styles.icon} name={"pencil"} size={25} />
            </TouchableOpacity>

        </View>
    );
    renderSeparator = () => (
        <HR/>
    );
    renderEmptyComponent = () => (
        <View style={styles.emptyList}>
            <Image style={styles.emptyImage} source={ require('../../assets/empty.png') } />
            <Text>Lista Vacía</Text>
        </View>
    );
    renderSectionHeader = ({ section : {title,data} }) =>(
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
            <HR size='100%'/>
        </View>
    );
    
    return (
        <SectionList 
            style={styles.container}
            sections={categories && categories.length ?[
                {title: labels.products, data:categories
                    .filter(category=>category.type==1)
                    .sort()
                },
                {title: labels.menus, data:categories
                    .filter(category=>category.type==2)
                    .sort()
                }
                ] : []
            }
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>renderItem(item)}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmptyComponent}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={true}
        />
    )
}
const size = 30;

const styles = StyleSheet.create({

    container:{
        width:"100%"
    },
    contentContainer: {
        flexGrow: 1
    },
    listItem:{
        width: '100%',
        flexDirection: "row",alignItems: 'center',
    },
    textItem:{
        flex:1,
        fontSize:16,
        fontWeight: 'bold',
        color: colors.text,
        paddingLeft: 10
    },
    roundButton: {
        height: size,
        width: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 3 },
        shadowColor: colors.shadowColor,
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    delete :{
        backgroundColor:colors.danger
    },
    edit :{
        backgroundColor:colors.accent
    },
    icon: {
        color: colors.primaryTextContrast
    },
    deleteText: {
        color:colors.primaryTextContrast,fontSize:20,fontWeight:'bold'
    },
    separator :{
        height: 1,
        width: "90%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
    },
    emptyList: {
        marginTop: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    sectionHeader: {
        width: '100%',
        marginTop: 10,
    },
    sectionHeaderText: {
        fontSize:20,
        fontWeight: 'bold'
    },
    emptyImage: {
        width: 200,
        height: 200,
    },
});
export default CategoryList;
