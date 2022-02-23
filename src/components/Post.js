import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons/';


function Post({ post,navigation }) {

    function getRandomImage() {
        let max = 100;
        let min = 1;
        let n = Math.floor(Math.random() * (max - min + 1) + min);
        let url = `https://randomuser.me/api/portraits/${n % 2 == 0 ? 'men' : 'women'
            }/${n}.jpg`;
        return url;
    }
    return (
        <View style={styles.postView}>
            {/* Post Header */}
            <View style={styles.postHeader}>
                <View>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{
                            uri: post.userProfileImage,
                        }}
                    />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#fff', fontFamily: 'NSBold', fontSize: 18 }}>
                        {post.name}
                    </Text>
                    <Text
                        style={{ color: '#fff', fontFamily: 'NSRegular', fontSize: 16 }}
                    >
                        {post.username}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Icon name='more-horizontal' color='#fff' size={28} />
                </TouchableOpacity>
            </View>
            {/* Post Content */}
            <View style={{ marginTop: 10 }}>
                <Text
                    style={{
                        color: '#fafafa',
                        fontFamily: 'NSRegular',
                        fontSize: 14,
                        paddingHorizontal: 10,
                    }}
                >
                    {post.postText}
                </Text>
                {post.postImage ? (
                    <Image
                        style={{ width: '100%', height: 300, marginTop: 10 }}
                        source={{ uri: post.postImage }}
                    />
                ) : null}
            </View>
            {/* Post Stats */}
            <View
                style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 10 }}
            >
                <TouchableOpacity style={styles.postStatsOpacity}>
                    <Icon name='heart' color='#fff' size={16} />
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {post.likes}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.postStatsOpacity,
                        marginLeft: 10,
                    }}
                    onPress={()=>navigation.navigate("comment")}
                >
                    <Icon name='message-circle' color='#fff' size={16} />
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {post.comments}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Post;



const styles = StyleSheet.create({
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    postStatsOpacity: {
        backgroundColor: '#222',
        padding: 8,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postView: {
        paddingVertical: 10,
        marginTop: 10,
        backgroundColor: '#333',
        borderRadius: 10,
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