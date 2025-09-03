// api/users.js - Netlify Function format with Firebase integration + fallback
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

// Données de secours si Firebase ne fonctionne pas
const fallbackParticipants = [
  {
    id: 'fallback_user_1',
    name: 'Alice Martin',
    contact: 'alice@example.com',
    phrase: 'Prête à gagner !',
    registeredAt: '2025-09-03T18:00:00.000Z',
    gamesPlayed: 3,
    gamesWon: 1,
    currentGameId: 'game_2',
    status: 'active'
  },
  {
    id: 'fallback_user_2', 
    name: 'Bob Durand',
    contact: 'bob@example.com',
    phrase: 'Let\'s battle!',
    registeredAt: '2025-09-03T18:30:00.000Z',
    gamesPlayed: 2,
    gamesWon: 0,
    currentGameId: null,
    status: 'active'
  }
];

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
      // Essayer Firebase d'abord
      try {
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
            message: 'Participants retrieved successfully from Firebase!',
            data: participants,
            count: participants.length,
            timestamp: new Date().toISOString(),
            firebaseConnected: true
          })
        };
      } catch (firebaseError) {
        console.log('Firebase error, using fallback data:', firebaseError.message);
        
        // Mode fallback avec données temporaires
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Participants retrieved successfully (fallback mode)',
            data: fallbackParticipants,
            count: fallbackParticipants.length,
            timestamp: new Date().toISOString(),
            firebaseConnected: false,
            note: 'Using fallback data - Firebase will be retried next time'
          })
        };
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
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

