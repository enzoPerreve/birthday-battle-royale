const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

// Mock Firebase for testing purposes when credentials are not available
let db, storage;

try {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
    token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
  };

  // Only initialize if we have proper credentials
  if (serviceAccount.private_key && serviceAccount.private_key !== "DEMO_PRIVATE_KEY") {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
      });
    }

    db = admin.firestore();
    storage = admin.storage();
    console.log('Firebase initialized successfully');
  } else {
    throw new Error('Demo credentials - using mock Firebase');
  }
} catch (error) {
  console.log('Firebase not configured - using mock database for testing');
  
  // Mock Firestore for testing
  const mockData = {
    users: new Map(),
    battles: new Map()
  };

  db = {
    collection: (name) => ({
      doc: (id) => ({
        set: async (data) => {
          mockData[name].set(id, { ...data, id });
          return { id };
        },
        get: async () => {
          const data = mockData[name].get(id);
          return {
            exists: !!data,
            id: id,
            data: () => data
          };
        },
        update: async (data) => {
          const existing = mockData[name].get(id);
          if (existing) {
            mockData[name].set(id, { ...existing, ...data });
          }
          return { id };
        }
      }),
      where: (field, operator, value) => ({
        get: async () => {
          const docs = Array.from(mockData[name].values()).filter(doc => {
            if (operator === '==') return doc[field] === value;
            if (operator === 'in') return value.includes(doc[field]);
            return true;
          });
          return {
            docs: docs.map(doc => ({
              id: doc.id,
              data: () => doc
            }))
          };
        },
        orderBy: () => ({
          get: async () => {
            const docs = Array.from(mockData[name].values());
            return {
              docs: docs.map(doc => ({
                id: doc.id,
                data: () => doc
              }))
            };
          }
        })
      }),
      orderBy: () => ({
        get: async () => {
          const docs = Array.from(mockData[name].values());
          return {
            docs: docs.map(doc => ({
              id: doc.id,
              data: () => doc
            }))
          };
        }
      }),
      get: async () => {
        const docs = Array.from(mockData[name].values());
        return {
          docs: docs.map(doc => ({
            id: doc.id,
            data: () => doc
          }))
        };
      }
    })
  };

  // Mock Storage for testing
  storage = {
    bucket: () => ({
      file: (fileName) => ({
        save: async () => console.log(`Mock: Saved file ${fileName}`),
        makePublic: async () => console.log(`Mock: Made file ${fileName} public`)
      }),
      name: 'mock-bucket'
    })
  };
}

module.exports = { admin, db, storage };