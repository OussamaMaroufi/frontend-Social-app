import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StatusBar,

} from 'react-native';
import { useFonts } from 'expo-font';

import NSLight from '../../assets/fonts/Nunito-Light.ttf'
import NSRegular from '../../assets/fonts/Nunito-Regular.ttf'
import NSBold from '../../assets/fonts/Nunito-Bold.ttf'
import NSExtraBold from '../../assets/fonts/Nunito-ExtraBold.ttf';

import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons/';
import Post from "../components/Post";
import { useSelector, useDispatch } from 'react-redux'
import { listPosts } from '../actions/postActions'

function Home({ navigation }) {

    const auth = useSelector((state) => state.userLogin)
    // console.log("fddd",auth.userInfo["username"]);


    const [loaded] = useFonts({
        NSLight,
        NSRegular,
        NSBold,
        NSExtraBold,
    });



    const dispatch = useDispatch();
    const { loading, posts, error } = useSelector((state) => state.postList)
    const handleList = () => {
        dispatch(listPosts())
    }
    useEffect(() => {
        handleList()

    }, [dispatch])


    function getRandomImage() {
        let max = 100;
        let min = 1;
        let n = Math.floor(Math.random() * (max - min + 1) + min);
        let url = `https://randomuser.me/api/portraits/${n % 2 == 0 ? 'men' : 'women'
            }/${n}.jpg`;

        return url;
    }




    if (loading & !loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="red" />
            </View>
        )
    } else {
        return (


            <View style={styles.container}>
                <ScrollView>
                    {/* Search Bar View */}
                    <View style={styles.searchBarView}>
                        <View style={styles.searchBar}>
                            <Icon name='search' size={22} color='#c1c1c1' />
                            <TextInput
                                style={{
                                    paddingHorizontal: 6,
                                    color: '#c1c1c1',
                                    fontFamily: 'NSRegular',
                                    fontSize: 16,
                                    width: "93%"

                                }}
                                placeholder='Search'
                                placeholderTextColor='#c1c1c1'
                                onFocus={() => navigation.navigate('search')}
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                            <Icon name="settings" color="#fff" size={25} />
                        </TouchableOpacity>
                    </View>
                    {/* Stories View */}
                    <View style={styles.storiesView}>
                        <View style={styles.storiesViewTitleView}>
                            <Text style={styles.storiesViewTitle}>Stories</Text>
                            <Text style={styles.showAllText}>Show all</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                {Array(10)
                                    .fill(0)
                                    .map((s) => (

                                        <TouchableOpacity key={Math.random() * 10} style={styles.storyUserProfile}>
                                            <Image
                                                style={styles.storyUserProfileImage}
                                                source={{ uri: getRandomImage() }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        </ScrollView>
                    </View>
                    {/* Posts View */}
                    <View style={styles.postsView}>
                        {posts.map((post) => (
                            <View key={post.id}>
                                <Post post={post} navigation={navigation} />
                            </View>
                        ))}
                    </View>
                    <View style={{ height: 20 }}></View>
                </ScrollView>
            </View>
        )
    }








}

export default Home;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        paddingTop: 40,
    },
    searchBarView: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#3f3f3f',
        marginRight: 10,
        borderRadius: 4,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    storiesView: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    storiesViewTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    storiesViewTitle: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'NSExtraBold',
    },
    showAllText: {
        color: '#c1c1c1',
        fontFamily: 'NSBold',
        fontSize: 18,
    },
    storyUserProfile: {
        marginRight: 20,
        borderColor: '#B53471',
        borderWidth: 2.5,
        borderRadius: 100,
    },
    storyUserProfileImage: { width: 60, height: 60, borderRadius: 100 },
    postsView: { paddingHorizontal: 10, marginTop: 10 },


});

