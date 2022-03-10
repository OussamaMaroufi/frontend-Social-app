import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import Useritem from '../components/UserItem';
import { listUsers } from '../actions/userActions';



const Findpeoplescreen = ({ searchText }) => {

    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.userList)

    const [users, setUsers] = useState([])
    console.log(users);





    // const showLoadMoreButton = data.next 
    let q = searchText;
    console.log(searchText);

    useEffect(async () => {
        await dispatch(listUsers(q = searchText))
        if (!loading) {
            setUsers(data.results)

        }
        // setUsers(data.results);

    }, [dispatch, searchText])









    //if Error Ocurred  
    if (error) {
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.container} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }
    if (users.length == 0) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: "#fff" }}>NO USER FOUND !! </Text>
            </View>
        )
    }

    return (

        <ScrollView style={{ marginTop: -30, height: "100%", marginBottom: 20 }}>
            {
                users.map((user) => (
                    <View style={{ marginTop: 10 }}>
                        <Useritem user={user} />
                    </View>
                ))
            }

        </ScrollView>


    );


}


export default Findpeoplescreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        maxHeight: 50
    },
    container: {

        marginTop: 10,
        backgroundColor: "red",
        flex: 1
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: '#fff'
    },
    listContainer: {
        alignItems: 'center'
    },
});

