import { doc, setDoc, getDoc } from 'firebase/firestore';

export const updateQuantity = async (db, nameUser, item, quantity, size) => {
    const load = doc(db, "Users", `${nameUser}`);
    const newItem = { ...item };
    try {
        const userDocSnap = await getDoc(load);
        const existingUser = userDocSnap.data();
        const updatedCart = [...existingUser.cart];
        console.log(item.quantity)
        updatedCart.forEach(itemtest => {
            if (itemtest.name == item.name) {
                if (itemtest.size == undefined) {
                    itemtest.quantity = item.quantity;
                }
                else {
                    if (size === "M")
                        {
                        itemtest.size[0].quantity = item.quantity;
                        }

                    else {
                        itemtest.size[1].quantity = item.quantity;
                        }
                    }
                }
            });
            const updatedUser = {
                ...existingUser,
                name: `${nameUser}`,
                cart: item != null && updatedCart
            };
            await setDoc(load, updatedUser);
            console.log("Document successfully updated!");
        } 
     catch (error) {
        console.error("Error getting user document:", error);
    }
};
