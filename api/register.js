// api/register.js - Netlify Function format with Firebase
import { db } from '../src/config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
          body: JSON.stringify({ success: false, message: 'Name and contact are required.' })
        };
      }
      
      const newUser = {
        name: name,
        contact: contact,
        phrase: phrase || 'Ready to battle!',
        registeredAt: serverTimestamp(), // Utilise l'heure du serveur Firebase
        gamesPlayed: 0,
        gamesWon: 0,
        currentGameId: null,
        status: 'active',
        lastActive: serverTimestamp()
      };

      // Ajoute le nouvel utilisateur à la collection "participants"
      const docRef = await addDoc(collection(db, "participants"), newUser);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'User registered successfully!',
          data: { id: docRef.id, ...newUser }
        })
      };
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
      message: 'Registration endpoint is ready',
      timestamp: new Date().toISOString()
    })
  };
};

