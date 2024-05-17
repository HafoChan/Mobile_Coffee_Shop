import { collection, query, where, getDocs, doc} from "firebase/firestore";
import db from './firebaseSetting';

async function loadDataToCart() {
    const q = query(collection(db, "Users"),where("name", "==", nameUser));
    try {
        const docSnap = await getDocs(q);
        const docs = [];
        docSnap.forEach(docdata => {
            docdata.data().cart.forEach(item=>{
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

async function itemFavourite (nameUser, item) {
    q = query(collection(db, "Favourites"), where("name", "==", nameUser))
    try {
        const docSnap = await getDocs(q);
        const docs = [];
        docSnap.forEach(doc => {
            docs.push(doc.data());
        });

        const user = docs[0];
        const listFavourite = user.ListFavourite;

        if (docs.length > 0) {
            if (item) {
                const favouriteItem = user.ListFavourite.find(favItem => favItem.name == item.name);
                if (favouriteItem) {
                    return favouriteItem.liked;
                } else {
                    return false;
                }
            } else {
                const likedItems = listFavourite.filter(item => item.liked == true)
                return likedItems
            }
        } else {
            console.log("Không tìm thấy người dùng");
            return false;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

export { loadDataToCart, fetchData, itemFavourite}; // Export the fetchData function
