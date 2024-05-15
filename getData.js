import { collection, query, where, getDocs} from "firebase/firestore";
import db from './firebaseSetting';

async function loadDataToCart() {
    const q = query(collection(db, "Users"),where("name","==","a1"));
    try {
        const docSnap = await getDocs(q);
        console.log("vo dc ")
        const docs = [];
        docSnap.forEach(docdata => {
            console.log(docdata.id, " => ", docdata.data());
            console.log(docdata.id)
            console.log('in')
            docdata.data().cart.forEach(item=>{
                console.log(item)
                docs.push(item)
            })
        });
        console.log(docs)
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

export { loadDataToCart, fetchData}; // Export the fetchData function
