const admin = require('firebase-admin');
const Question = require('../models/Question');

// Sample questions about the birthday person
const sampleQuestions = [
  {
    question: "Quelle est la couleur préférée d'Enzo ?",
    options: ["Bleu", "Rouge", "Vert", "Violet"],
    correctAnswer: 0,
    category: "preferences",
    difficulty: "easy",
    points: 10
  },
  {
    question: "Quel est le plat préféré d'Enzo ?",
    options: ["Pizza", "Pâtes", "Sushi", "Burger"],
    correctAnswer: 1,
    category: "preferences",
    difficulty: "easy",
    points: 10
  },
  {
    question: "Dans quelle ville est né Enzo ?",
    options: ["Paris", "Lyon", "Marseille", "Toulouse"],
    correctAnswer: 0,
    category: "personal",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quel est le sport préféré d'Enzo ?",
    options: ["Football", "Basketball", "Tennis", "Natation"],
    correctAnswer: 0,
    category: "hobbies",
    difficulty: "easy",
    points: 10
  },
  {
    question: "Quelle est la matière préférée d'Enzo à l'école ?",
    options: ["Mathématiques", "Histoire", "Sciences", "Français"],
    correctAnswer: 2,
    category: "education",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quel est l'animal préféré d'Enzo ?",
    options: ["Chien", "Chat", "Poisson", "Oiseau"],
    correctAnswer: 0,
    category: "preferences",
    difficulty: "easy",
    points: 10
  },
  {
    question: "Quelle est la saison préférée d'Enzo ?",
    options: ["Printemps", "Été", "Automne", "Hiver"],
    correctAnswer: 1,
    category: "preferences",
    difficulty: "easy",
    points: 10
  },
  {
    question: "Quel est le film préféré d'Enzo ?",
    options: ["Star Wars", "Harry Potter", "Marvel", "Disney"],
    correctAnswer: 2,
    category: "entertainment",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quelle est la musique préférée d'Enzo ?",
    options: ["Pop", "Rock", "Rap", "Classique"],
    correctAnswer: 1,
    category: "entertainment",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quel est le rêve de voyage d'Enzo ?",
    options: ["Japon", "États-Unis", "Australie", "Brésil"],
    correctAnswer: 0,
    category: "dreams",
    difficulty: "hard",
    points: 30
  },
  {
    question: "Quelle est la plus grande peur d'Enzo ?",
    options: ["Araignées", "Hauteur", "Noir", "Eau"],
    correctAnswer: 1,
    category: "personal",
    difficulty: "hard",
    points: 30
  },
  {
    question: "Quel est le hobby secret d'Enzo ?",
    options: ["Cuisine", "Jardinage", "Peinture", "Danse"],
    correctAnswer: 2,
    category: "hobbies",
    difficulty: "hard",
    points: 30
  },
  {
    question: "Quelle est la boisson préférée d'Enzo ?",
    options: ["Coca-Cola", "Jus d'orange", "Eau", "Thé"],
    correctAnswer: 1,
    category: "preferences",
    difficulty: "easy",
    points: 10
  },
  {
    question: "Quel est le jeu vidéo préféré d'Enzo ?",
    options: ["FIFA", "Call of Duty", "Minecraft", "Fortnite"],
    correctAnswer: 2,
    category: "entertainment",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quelle est la qualité principale d'Enzo ?",
    options: ["Généreux", "Drôle", "Intelligent", "Courageux"],
    correctAnswer: 1,
    category: "personality",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quel est le projet futur d'Enzo ?",
    options: ["Voyager", "Étudier", "Travailler", "Créer une entreprise"],
    correctAnswer: 3,
    category: "dreams",
    difficulty: "hard",
    points: 30
  },
  {
    question: "Quelle est l'activité préférée d'Enzo le weekend ?",
    options: ["Dormir", "Sortir avec des amis", "Regarder des films", "Jouer aux jeux vidéo"],
    correctAnswer: 1,
    category: "hobbies",
    difficulty: "easy",
    points: 10
  },
  {
    question: "Quel est le type de livre préféré d'Enzo ?",
    options: ["Science-fiction", "Romance", "Aventure", "Biographie"],
    correctAnswer: 2,
    category: "entertainment",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quelle est la tradition familiale préférée d'Enzo ?",
    options: ["Noël", "Anniversaires", "Vacances d'été", "Repas du dimanche"],
    correctAnswer: 1,
    category: "family",
    difficulty: "medium",
    points: 20
  },
  {
    question: "Quel est le superpouvoir qu'Enzo aimerait avoir ?",
    options: ["Voler", "Invisibilité", "Lire dans les pensées", "Téléportation"],
    correctAnswer: 3,
    category: "dreams",
    difficulty: "hard",
    points: 30
  }
];

const seedQuestions = async () => {
  try {
    console.log('🌱 Starting to seed questions...');
    
    for (const questionData of sampleQuestions) {
      try {
        const result = await Question.create(questionData);
        console.log(`✅ Created question: "${questionData.question}"`);
      } catch (error) {
        console.error(`❌ Error creating question "${questionData.question}":`, error.message);
      }
    }
    
    console.log('✅ Finished seeding questions!');
    console.log(`📊 Total questions attempted: ${sampleQuestions.length}`);
    
    // Get total count to verify
    const allQuestions = await Question.getAll();
    console.log(`📈 Total questions in database: ${allQuestions.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
  }
};

// Export for use in routes or standalone execution
module.exports = { seedQuestions, sampleQuestions };

// Allow running this script directly
if (require.main === module) {
  seedQuestions()
    .then(() => {
      console.log('🎉 Question seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Question seeding failed:', error);
      process.exit(1);
    });
}
