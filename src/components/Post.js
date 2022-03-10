import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Feather as Icon, AntDesign as FAIcon } from '@expo/vector-icons/';
import formatDate from '../utilities/formatDate'
import { useRoute } from '@react-navigation/native';
import store from "../store"
import axios from 'axios';
function Post({ post, navigation }) {


    const [react, setReact] = useState('')
    const [likeNo,setLikeNo] = useState(post.up_voters.length)
    const [dislikeNo,setDislikeNo] = useState(post.down_voters.length)
    // console.log(post);
    const route = useRoute();
    // console.log(route);
    const {
        userLogin: { userInfo },
    } = store.getState()



    // console.log("user", userInfo)

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`
        }
    }

    const handleLike = async () => {

        let foundDisLike  = post.down_voters.includes(userInfo.profile);
        if(foundDisLike){
            setDislikeNo((prev)=>prev-1)
        }

        try {

            const { data } = await axios.post(`http://192.168.1.100:8000/api/posts/react/${post.id}/`, { value: "like" }, config)
            // check if curent user in ipvoter first if no react = like else react =  '' ==>that'smean user delete his react 
            // let res = data.up_voters.filter((user) => user.id == userInfo.id)
            const isFound = data.up_voters.some(user => {
                if (user.id === userInfo.id) {
                  return true;
                }
              });
            console.log("ddd", isFound);
            // console.log(data.up_voters);
            if(isFound){

                setReact('like');
                setLikeNo((prev)=>prev+ 1)

               
                
        

            }else{
                setReact('');
                setLikeNo((prev)=> prev - 1)
            }
        } catch {
            console.log("There is some error here !! ");
        }

    }

    const handleDislike = async () => {
        try {

            

            console.log("You dislike this post ", post.id);
            const { data } = await axios.post(`http://192.168.1.100:8000/api/posts/react/${post.id}/`, { value: "dislike" }, config)
            //check if cuurent user in downvoter first if not react = dislike  else react = '' 
            const isFound = data.down_voters.some(user => {
                if (user.id === userInfo.id) {
                  return true;
                }
              });
              if(isFound){
                  setReact('dislike');
                  setDislikeNo((prev)=>prev+1)
                  
                  

              }else{
                  setReact("");
                  setDislikeNo((prev)=> prev - 1)
                  
                                }
        } catch {
            console.log("There is some error Here !!! ");
        }
    }

    // console.log(userInfo);

    // let storeContent = store.getState()
    // console.log("This is store content  ", storeContent);



    // const checkReactType = () => {
             
    //     // const islike = post.up_voters.some(voter => {
    //     //     if (voter.id === userInfo.profile.id) {
    //     //         setReact('like')
    //     //     }
    //     // });
    //     let foundLike  = post.up_voters.includes(userInfo.profile);
    //     if(foundLike){
    //         setReact('like')
    //     }

    //     let foundDislike = post.down_voters.includes(userInfo.profile);
    //     if(foundDislike){
    //         setReact('dislike');
    //     }
    // }

  useEffect(()=>{
    // checkReactType()
    
    console.log('ff')
    
  },[react,likeNo,dislikeNo])




    function getRandomImage() {
        let max = 100;
        let min = 1;
        let n = Math.floor(Math.random() * (max - min + 1) + min);
        let url = `https://randomuser.me/api/portraits/${n % 2 == 0 ? 'men' : 'women'
            }/${n}.jpg`;
        return url;
    }
    return (
        <View style={[styles.postView, route.name == "home" ? { borderRadius: 10, marginTop: 10, } : { borderRadius: 0, marginTop: 0 }]}>
            {/* Post Header */}
            <View style={styles.postHeader}>
                <View>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{
                            uri: `http://192.168.1.100:8000${post.user.profile_pic}/`,
                        }}
                    />
                    {/*Display Time created */}

                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#fff', fontFamily: 'NSBold', fontSize: 18 }}>
                        {post.user.username}
                    </Text>
                    <Text
                        style={{ color: '#fff', fontFamily: 'NSRegular', fontSize: 16 }}
                    >
                        {post.user.username}
                    </Text>
                </View>

                <View>

                    <Text style={{ color: "#fff" }} >{formatDate.distanceDate(post.created)}</Text>
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
                    {post.content}
                </Text>
                {post.image ? (
                    <Image
                        style={{ width: '100%', height: 300, marginTop: 10 }}
                        source={{ uri: `http://192.168.1.100:8000${post.image}/`, }}
                    />
                ) : null}
            </View>
            {/* Post Stats */}
            <View
                style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 10 }}
            >
                <TouchableOpacity style={styles.postStatsOpacity} onPress={handleLike}>
                    {
                        (react === "like" ||post.up_voters.includes(userInfo.profile))  ?(
                            <FAIcon name='like2' color="blue" size={20} />
                        ):(

                            <FAIcon name='like2' color="#fff" size={20} />
                        )
                    }
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {likeNo}
                       

                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    ...styles.postStatsOpacity,
                    marginLeft: 10,
                }} onPress={handleDislike}>
                    {
                        (react === "dislike" || post.down_voters.includes(userInfo.profile)) ?(
                            <FAIcon name='dislike2' color="red" size={20} />
                        ):(

                            <FAIcon name='dislike2' color="#fff" size={20} />
                        )
                    }
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {dislikeNo}
                       

                    </Text>
                </TouchableOpacity>

                {route.name == "home" && <TouchableOpacity
                    style={{
                        ...styles.postStatsOpacity,
                        marginLeft: 10,
                    }}
                    onPress={() => navigation.navigate("comment", { post })}
                >
                    <Icon name='message-circle' color='#fff' size={16} />

                    {
                        post.comment_count > 0 ? (
                            <Text
                                style={{
                                    marginLeft: 6,
                                    fontFamily: 'NSRegular',
                                    color: '#fff',
                                }}
                            >
                                {post.comment_count}
                            </Text>
                        ) :
                            <Text></Text>
                    }


                </TouchableOpacity>}


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