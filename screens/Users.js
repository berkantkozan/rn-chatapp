import React, { useState,  useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { auth, database } from '../config/firebase';

const UserScreen = () => {
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {

    const usersRef = collection(database, 'users');
    const q = query(usersRef, orderBy('email', 'desc'));

const unsubscribe = onSnapshot(q, querySnapshot => {
    console.log('querySnapshot users');
    setUsers(
        querySnapshot.docs.map(doc => ({
          name: doc.data().name,
          photoURL: doc.data().photoURL,
        }))
      );
    });
return unsubscribe;
  }, []);

  const currentEmail = auth?.currentUser?.email;

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <View style={{ backgroundColor: item.isOnline ? 'green' : 'gray', width: 10, height: 10, borderRadius: 5, marginRight: 10 }} />
      <Text >{ item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
};

export default UserScreen;

