import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Feather as Icon, AntDesign as FAIcon } from '@expo/vector-icons/';
import formatDate from '../utilities/formatDate'
import { useRoute } from '@react-navigation/native';


const Commentitem = ({ comment }) => {

    // console.log("This comment from comment Item component j ",comment);

    const route = useRoute();

    const handleLike = ()=>{
        console.log("You Like this post",post.id);
    }



    const handleDislike= ()=>{
        console.log("You dislike this post ",post.id);
    }
  

    return (
        <View style={[styles.postView, !(route.name == "home") ? { borderRadius: 10, marginTop: 10, } : { borderRadius: 0, marginTop: 0 }]}>
            {/* Post Header */}
            <View style={styles.postHeader}>
                <View>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{
                            uri: `http://192.168.1.100:8000${comment.user.profile_pic}/`,
                        }}
                    />
                    {/*Display Time created */}

                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#fff', fontFamily: 'NSBold', fontSize: 18 }}>
                        {comment.user.username}
                    </Text>
                </View>

                <View>

                    <Text style={{ color: "#fff" }} >{formatDate.distanceDate(comment.created)}</Text>
                    <TouchableOpacity>
                        <Icon name='more-horizontal' color='#fff' size={28} style={{ alignSelf: "flex-end" }} />
                    </TouchableOpacity>
                </View>
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
                    {comment.content}
                </Text>
                {comment.image ? (
                    <Image
                        style={{ width: '100%', height: 300, marginTop: 10 }}
                        source={{ uri: `http://192.168.1.100:8000${comment.image}/`, }}
                    />
                ) : null}
            </View>
            {/* Comment Stats */}
            <View
                style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 10 }}
            >
                <TouchableOpacity style={styles.postStatsOpacity} onPress={handleLike}>
                    <FAIcon name='like2' color="#fff" size={20} />
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {comment.likes}
                        111

                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    ...styles.postStatsOpacity,
                    marginLeft: 10,
                }} onPress={handleDislike}>
                    <FAIcon name='dislike2' color="#fff" size={20} />
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {comment.likes}
                        122

                    </Text>
                </TouchableOpacity>



            </View>

        </View>
    );
}

export default Commentitem;



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
        paddingVertical: 7,
        backgroundColor: '#333',
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