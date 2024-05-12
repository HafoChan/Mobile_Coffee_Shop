import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from './firebaseSetting';

// Define the fetchData function outside of the App component
async function fetchData(category, id) {
    if (id == null)
        q = collection(db, category)
    else
        q = query(collection(db, category), where("id", "==", id))

    try {
        const docSnap = await getDocs(q);
        const docs = [];
        docSnap.forEach(docdata => {
            docs.push(docdata.data());
        });
        if (id != null)
            return docs[0]
        return docs
    } catch (error) {
        console.error("Error fetching document:", error)
    }
}

export { fetchData }
