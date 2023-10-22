import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = {
    addToCart: async (book) => {
        try {
            const existingCart = await AsyncStorage.getItem('cart');
            const cart = existingCart ? JSON.parse(existingCart) : { items: [] };

            const existingItem = cart.items.find((item) => item.book.id === book.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ book, quantity: 1 });
            }

            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            //console.log("Successfully added to cart!");
            return true;
        } catch (error) {
            //console.error('Error adding to cart:', error);
            return false;
        }
    },
    getCart: async () => {
        try {
            const cartData = await AsyncStorage.getItem('cart');
            return cartData ? JSON.parse(cartData) : { items: [] };
        } catch (error) {
            console.error('Error getting cart:', error);
            return { items: [] };
        }
    },
    removeFromCart: async (bookId) => {
        try {
            const existingCart = await AsyncStorage.getItem('cart');
            const cart = existingCart ? JSON.parse(existingCart) : { items: [] };
        
            const itemIndex = cart.items.findIndex((item) => item.book.id === bookId);
        
            if (itemIndex >= 0) {
                cart.items.splice(itemIndex, 1);
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    },
    
    decreaseQuantity: async (bookId) => {
        try {
            const existingCart = await AsyncStorage.getItem('cart');
            const cart = existingCart ? JSON.parse(existingCart) : { items: [] };

            const existingItem = cart.items.find((item) => item.book.id === bookId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    },
    
    increaseQuantity: async (bookId) => {
        try {
            const existingCart = await AsyncStorage.getItem('cart');
            const cart = existingCart ? JSON.parse(existingCart) : { items: [] };

            const existingItem = cart.items.find((item) => item.book.id === bookId);

            if (existingItem) {
                existingItem.quantity += 1;
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    },
};

export default Cart;
