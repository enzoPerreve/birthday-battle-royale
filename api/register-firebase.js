// api/register-firebase.js - Version Firebase pour tester Firestore
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
            message: 'Name and contact are required.',
            firebaseTest: true
          })
        };
      }
      
      const newUser = {
        name: name,
        contact: contact,
        phrase: phrase || 'Ready to battle!',
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
          firebaseConnected: true,
          firestoreWorking: true
        })
      };
    } catch (error) {
      console.error('Firebase registration error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Firebase registration failed',
          error: error.message,
          firebaseTest: true,
          firestoreError: true
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
      message: 'Firebase registration endpoint is ready',
      timestamp: new Date().toISOString(),
      firebaseConfigured: true
    })
  };
};
