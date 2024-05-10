import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from './firebaseSetting';

// Define the fetchData function outside of the App component
async function fetchData() {
    const q = query(collection(db, "coffecold"), where("id", "==", 2));
    try {
        const docSnap = await getDocs(q);
        const docs = [];
        docSnap.forEach(docdata => {
            docs.push(docdata.data());
        });
        return docs[0]; // Trả về bản ghi đầu tiên (vì bạn đang tìm kiếm theo ID)
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}


export { fetchData }; // Export the fetchData function
