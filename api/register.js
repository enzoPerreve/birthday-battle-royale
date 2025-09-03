// api/register.js - Netlify Function format with Firebase integration
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuration Firebase (utilise les variables d'environnement de Netlify)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialiser Firebase seulement si ce n'est pas déjà fait
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle pre-flight CORS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { name, contact, phrase } = body;

      if (!name || !contact) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            message: 'Name and contact are required.'
          })
        };
      }
      
      // Essayer Firebase d'abord, fallback en mode local si erreur
      try {
        const newUser = {
          name: name.trim(),
          contact: contact.trim(),
          phrase: phrase?.trim() || 'Ready to battle!',
          registeredAt: serverTimestamp(),
          gamesPlayed: 0,
          gamesWon: 0,
          currentGameId: null,
          status: 'active',
          lastActive: serverTimestamp()
        };

        // Ajouter à Firestore
        const docRef = await addDoc(collection(db, "participants"), newUser);

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'User registered successfully with Firebase!',
            data: { id: docRef.id, ...newUser },
            firebaseConnected: true
          })
        };
      } catch (firebaseError) {
        console.log('Firebase error, using local mode:', firebaseError.message);
        
        // Mode local de secours
        const newUser = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: name.trim(),
          contact: contact.trim(),
          phrase: phrase?.trim() || 'Ready to battle!',
          registeredAt: new Date().toISOString(),
          gamesPlayed: 0,
          gamesWon: 0,
          currentGameId: null,
          status: 'active',
          lastActive: new Date().toISOString()
        };

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'User registered successfully! (Local fallback mode)',
            data: newUser,
            firebaseConnected: false,
            note: 'Using local mode - Firebase will be retried next time'
          })
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Registration failed due to a server error.',
          error: error.message
        })
      };
    }
  }

  // GET method for endpoint status
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      message: 'Registration endpoint is ready (Firebase + Local fallback)',
      timestamp: new Date().toISOString()
    })
  };
};

