import { collection, query, where, getDocs, doc} from "firebase/firestore";
import db from './firebaseSetting';

async function loadDataToCart(name) {
    const q = query(collection(db, "Users"),where("name","==",name));
    try {
        const docSnap = await getDocs(q);
        const docs = [];
        docSnap.forEach(docdata => {
            // console.log(docdata.id, " => ", docdata.data());
            docdata.data().cart.forEach(item=>{
                docs.push(item)
            })
        });
        return docs; // Trả về bản ghi đầu tiên (vì bạn đang tìm kiếm theo ID)
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}
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
async function deleteItemFromCart(name,size) {
    const q = query(collection(db, "Users"),where("cart","array-contains","description"))
    try {
        const docSnap = await getDocs(q);
        const docs = [];
        console.log(docSnap)
        docSnap.forEach(docdata => {
            console.log("vao dcccc")
            console.log(docdata.id, " => ", docdata.data());
            docdata.data().cart.forEach(item=>{
                docs.push(item)
            })
        });
        return docs[0]; // Trả về bản ghi đầu tiên (vì bạn đang tìm kiếm theo ID)
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

export { loadDataToCart, fetchData,deleteItemFromCart}; // Export the fetchData function
