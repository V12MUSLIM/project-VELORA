import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const saved = localStorage.getItem('techmart-wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('techmart-wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const toggleWishlist = (product) => {
        setWishlistItems(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                
                return prev.filter(item => item.id !== product.id);
            }
            
            return [...prev, { ...product, addedAt: new Date().toISOString() }];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prev => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const clearWishlist = () => {
        if (window.confirm('Are you sure you want to clear your wishlist?')) {
            setWishlistItems([]);
        }
    };

    const moveToCart = (productId, addToCartFunction) => {
        const item = wishlistItems.find(i => i.id === productId);
        if (item) {
            addToCartFunction(item);
            removeFromWishlist(productId);
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            toggleWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
            moveToCart,
            wishlistCount: wishlistItems.length
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
}