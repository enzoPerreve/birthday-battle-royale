// api/users.js - Netlify Function format with Firebase integration
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';

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
  // CORS headers for Netlify
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle pre-flight CORS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204, // No Content
      headers
    };
  }

  if (event.httpMethod === 'GET') {
    try {
      // Récupérer tous les participants depuis Firestore
      const participantsQuery = query(
        collection(db, 'participants'), 
        orderBy('registeredAt', 'desc')
      );
      
      const querySnapshot = await getDocs(participantsQuery);
      const participants = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        participants.push({
          id: doc.id,
          ...data,
          // Convertir les timestamps Firestore en strings pour JSON
          registeredAt: data.registeredAt?.toDate?.()?.toISOString() || data.registeredAt,
          lastActive: data.lastActive?.toDate?.()?.toISOString() || data.lastActive
        });
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Participants retrieved successfully',
          data: participants,
          count: participants.length,
          timestamp: new Date().toISOString()
        })
      };
    } catch (error) {
      console.error('Error fetching participants from Firebase:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Failed to fetch participants',
          error: error.message
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      success: false,
      message: `Method ${event.httpMethod} not allowed`
    })
  };
};

