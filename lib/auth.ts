// Authentication service for nick + PIN login
import { db, type User } from './db';

const CURRENT_USER_KEY = 'finflow_current_user';

// Register new user
export async function registerUser(nick: string, pin: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Validate inputs
        if (!nick || nick.trim().length < 3) {
            return { success: false, error: 'Nick en az 3 karakter olmalıdır' };
        }

        if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
            return { success: false, error: 'PIN 4 haneli sayı olmalıdır' };
        }

        // Check if nick already exists locally
        const existingLocal = await db.users.where('nick').equals(nick.trim().toLowerCase()).first();
        if (existingLocal) {
            return { success: false, error: 'Bu nick zaten kullanılıyor (Yerel)' };
        }

        // Check if nick already exists globally (Leaderboard)
        try {
            const checkRes = await fetch('/api/user/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nick: nick.trim() }),
            });
            const checkData = await checkRes.json();
            if (checkData.exists) {
                return { success: false, error: 'Bu nick zaten başka bir kullanıcı tarafından alınmış' };
            }
        } catch (error) {
            console.error('Global nick check failed:', error);
            // Fallback: if API fails, allow local check to stay functional
        }

        // Create user
        const userId = await db.users.add({
            nick: nick.trim().toLowerCase(),
            pin: pin,
            createdAt: new Date(),
        });

        // Set as current user
        const user = await db.users.get(userId);
        if (user) {
            setCurrentUser(user);
        }

        return { success: true };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Kayıt sırasında hata oluştu' };
    }
}

// Login user
export async function loginUser(nick: string, pin: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Find user
        const user = await db.users.where('nick').equals(nick.trim().toLowerCase()).first();

        if (!user) {
            return { success: false, error: 'Kullanıcı bulunamadı' };
        }

        // Verify PIN
        if (user.pin !== pin) {
            return { success: false, error: 'Hatalı PIN' };
        }

        // Set as current user
        setCurrentUser(user);

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Giriş sırasında hata oluştu' };
    }
}

// Set current user in session
function setCurrentUser(user: User) {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
            id: user.id,
            nick: user.nick,
        }));
    }
}

// Get current user
export function getCurrentUser(): { id: number; nick: string } | null {
    if (typeof window === 'undefined') return null;

    const stored = sessionStorage.getItem(CURRENT_USER_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

// Get current user ID
export function getCurrentUserId(): number | null {
    const user = getCurrentUser();
    return user?.id || null;
}

// Logout user
export function logoutUser() {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem(CURRENT_USER_KEY);
        sessionStorage.removeItem('finflow_unlocked');
        window.location.reload();
    }
}

// Check if user exists
export async function checkNickAvailable(nick: string): Promise<boolean> {
    const existing = await db.users.where('nick').equals(nick.trim().toLowerCase()).first();
    return !existing;
}
