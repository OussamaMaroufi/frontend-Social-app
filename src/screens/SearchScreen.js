import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,SafeAreaView } from 'react-native';
import Searchbar from '../components/SearchBar';
import Findpagesscreen from './FindPagesScreen';
import Findpeoplescreen from './FindPeopleScreen';
import Findpostscreen from './FindPostscreen';

const Searchscreen = () => {

    const [searchText, setSearchText] = useState("");
    const [showContent, setShowContent] = useState('users');

    console.log(showContent);



    return (
        <SafeAreaView style={styles.container}>
     
            <View style={{marginTop:10,marginLeft:10}}>

            <Searchbar setSearchText={setSearchText} />
            </View>
        
            <View style={{ marginTop: 0,height:60}}>

                <View style={styles.ContentButtonsView}>

                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'users' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('users')}
                    >
                        <Text style={styles.showContentButtonText}>users</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'posts' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('posts')}
                    >
                        <Text style={styles.showContentButtonText}>posts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            ...styles.showContentButton,
                            borderBottomWidth: showContent === 'pages' ? 2 : 0,
                        }}
                        onPress={() => setShowContent('pages')}
                    >
                        <Text style={styles.showContentButtonText}>pages</Text>
                    </TouchableOpacity>


                </View>

            </View>
            {/**Show Result of Search  */}
            <View style={{marginTop:5}}>
                    {
                        showContent === 'users' ?(
                            <Findpeoplescreen searchText={searchText}/>
                        ):showContent === 'posts' ? (
                            <Findpostscreen searchText={searchText}/>
                        ):(
                            <Findpagesscreen searchText={searchText}/>
                        )
                    }
                        
            </View>
         
        </SafeAreaView>
    );
}


export default Searchscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // // justifyContent:"center",
        // alignItems: "center",
        // // backgroundColor:"#333",
        marginTop:25,
        // marginLeft: 15,
        // maxHeight: "80%"
        backgroundColor: '#1f1f1f',
    },
    choiceView: {

        flexDirection: "row",
        justifyContent: "space-around",
        maxHeight: 50,


    },
    optionItem: {
        marginHorizontal: 15,
        marginVertical: 5,
        backgroundColor: "grey",
        maxHeight: 30,
        width: 80,
        borderRadius: 15,
        paddingVertical: 3,

    },
    text: {
        textAlign: "center",
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold"
    },
    Result: {
        marginTop: 10,

    },
    showContentButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomColor: "#ED4C67",
        marginHorizontal:7,
        borderBottomWidth:1
    },
    showContentButtonText: {
        // fontFamily: 'SSRegular',
        fontSize: 18,
        color:"#fff"
    },
    ContentButtonsView: {
        flexDirection: 'row',
        // borderTopWidth: 2,
        // borderTopColor: '#f1f3f6'
        shadowColor: '#1e1e1e',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 8,
    
    },

})