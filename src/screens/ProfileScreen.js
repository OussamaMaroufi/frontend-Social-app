
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';


import { Feather as Icon } from '@expo/vector-icons';

import Post from '../components/Post';


import NSLight from '../../assets/fonts/Nunito-Light.ttf'
import NSRegular from '../../assets/fonts/Nunito-Regular.ttf'
import NSBold from '../../assets/fonts/Nunito-Bold.ttf'
import NSExtraBold from '../../assets/fonts/Nunito-ExtraBold.ttf';




const Profilescreen = () => {
    const [posts] = useState([
        {   
            id:1,
            name: 'John Doe',
            username: 'johndoe',
            userProfileImage: 'https://randomuser.me/api/portraits/men/26.jpg',
            postText:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio facilis maiores iusto possimus praesentium reprehenderit, illum corrupti perspiciatis aperiam qui.',
            likes: 245,
            comments: 19,
        },
        {
            id:2,
            name: 'Adam Walker',
            username: 'adam_walker16',
            userProfileImage: 'https://randomuser.me/api/portraits/men/71.jpg',
            postText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
            postImage:
                'https://images.pexels.com/photos/4881622/pexels-photo-4881622.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            likes: 132,
            comments: 26,
        },
        {
            id:3,
            name: 'Hailey Diaz',
            username: 'hailey192',
            userProfileImage: 'https://randomuser.me/api/portraits/women/73.jpg',
            postText: 'Lorem ipsum 🐶',
            postImage:
                'https://images.pexels.com/photos/2691779/pexels-photo-2691779.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            likes: 459,
            comments: 133,
        },
    ]);


    return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
       
          <View>
            <Image
              style={styles.coverImage}
              source={{ uri: 'https://picsum.photos/500/500?random=211' }}
            />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: 'https://randomuser.me/api/portraits/women/46.jpg',
                  }}
                />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{'Sophie Welch'}</Text>
                <Text style={styles.userBio}>{'I love capturing photos'}</Text>
              </View>
              {/* Posts/Followers/Following View */}
              <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>13</Text>
                  <Text style={styles.countText}>Posts</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>1246</Text>
                  <Text style={styles.countText}>Followers</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>348</Text>
                  <Text style={styles.countText}>Following</Text>
                </View>
              </View>

              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity style={styles.interactButton}>
                  <Text style={styles.interactButtonText}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: '#4b7bec',
                  }}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: '#4b7bec' }}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Mutual Followed By Text */}
              <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
                <Text style={{ fontFamily: 'NSRegular', fontSize: 16 }}>
                  {'Followed by '}
                  <Text style={{ fontFamily: 'NSBold' }}>john_doe </Text>
                  {'and '}
                  <Text style={{ fontFamily: 'NSBold' }}>19 others</Text>
                </Text>
              </View>

            </View>
            </View>

            <View style={styles.postsView}>
            {posts.map((post) => (
                <View key={post.id}>
                <Post  post={post} />
                </View>
            ))}
        </View>
           
            </ScrollView>
           </View> 
        

            
    

    
    );
}

export default Profilescreen;


const styles = StyleSheet.create({
    coverImage: { height: 300, width: '100%' },
    profileContainer: {
      // height: 1000,
      backgroundColor: '#fff',
      marginTop: -100,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    profileImageView: { alignItems: 'center', marginTop: -50 },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: '#fff',
    },
    nameAndBioView: { alignItems: 'center', marginTop: 10 },
    userFullName: { fontFamily: 'NSBold', fontSize: 26 },
    userBio: {
      fontFamily: 'NSRegular',
      fontSize: 18,
      color: '#333',
      marginTop: 4,
    },
    countsView: { flexDirection: 'row', marginTop: 20 },
    countView: { flex: 1, alignItems: 'center' },
    countNum: { fontFamily: 'NSBold', fontSize: 20 },
    countText: { fontFamily: 'NSRegular', fontSize: 18, color: '#333' },
    interactButtonsView: {
      flexDirection: 'row',
      marginTop: 10,
      paddingHorizontal: 20,
    },
    interactButton: {
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#4b7bec',
      margin: 5,
      borderRadius: 4,
    },
    interactButtonText: {
      fontFamily: 'NSBold',
      color: '#fff',
      fontSize: 18,
      paddingVertical: 6,
    },
    profileContentButtonsView: {
      flexDirection: 'row',
      borderTopWidth: 2,
      borderTopColor: '#f1f3f6',
    },
    showContentButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomColor: '#000',
    },
    showContentButtonText: {
      fontFamily: 'NSRegular',
      fontSize: 18,
    },
    postsView: { paddingHorizontal: 10, marginTop: 10 ,backgroundColor:'#1f1f1f'},
  });