import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from './firebaseSetting';

// Define the drink class outside of the App component
export class Drink {
    constructor(description, id, imgUrl, name, size) {
        this.description = description;
        this.id = id;
        this.imgUrl = imgUrl;
        this.name = name;
        this.size = size;
    }
    toString() {
        return this.name + ', ' + this.description + ', ' + this.size;
    }
}

// Define the fetchData function outside of the App component
async function fetchData() {
    const q = query(collection(db, "coffecold"), where("id", "==", 2));
    try {
        const docSnap = await getDocs(q);
        docSnap.forEach(docdata => {
            const doc = docdata.data();
            console.log(doc)
            console.log(new Drink(doc.description, doc.id, doc.imgUrl, doc.name, doc.size))
            return doc
        });
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

function App() {
 
        fetchData(2)

    return (
        <View>
            <Text>a</Text> 
        </View>
    );
}

export { fetchData }; // Export the fetchData function
export default App;
