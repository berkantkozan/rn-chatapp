import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker'
import { auth, database } from '../../config/firebase';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    doc,
    updateDoc

} from 'firebase/firestore';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [name, setName] = useState('');
    const [userData, setUserData] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const user = auth?.currentUser;
            if (user) {
                setUser(user);
                const usersRef = collection(database, 'users');
                const q = query(usersRef, orderBy('email', 'desc'));

                const unsub = onSnapshot(q, querySnapshot => {
                    console.log('querySnapshot profile');
                    querySnapshot.docs.map(doc => {
                        if (user.email == doc.data().email) {
                            setName(doc.data().name);
                            setPhotoUrl(doc.data().photoUrl);
                        }
                    })

                });
                return unsub;
            } else {
                navigation.navigate('Login');
            }
        
    }, [navigation]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.navigate('Login');
        });
    };

    const handleSave = async () => {
        try {
            const q = query(collection(database, "users"), where("email", "==", user.email));
            await userRef.UpdateData({ email: name, photoURL: photoUrl });
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    const selectImage = () => {
        ImagePicker.launchImageLibrary(
          { mediaType: 'photo', quality: 0.5 },
          (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
                setPhotoUrl(response.assets[0].uri);
                const usersRef = collection(database, 'users');
                const q = query(usersRef, orderBy('email', 'desc'));

                const unsub = onSnapshot(q, querySnapshot => {
                    console.log('querySnapshot profile');
                    querySnapshot.docs.map(doc => {
                        if (user.email == doc.data().email) {
                            
                        }
                    })

                });
                return unsub;
            }
          },
        );
      };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={selectImage}>
            {photoUrl ? (
                <Image source={{ uri: photoUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'gray' }} />
            )}
            </TouchableOpacity>
            <TextInput
                style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />
            <TouchableOpacity style={{ marginTop: 20 }} onPress={handleSave}>
                <Text style={{ color: 'blue' }}>save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={handleLogout}>
                <Text style={{ color: 'red' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;
