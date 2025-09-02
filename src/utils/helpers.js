// Utility functions for Birthday Battle Royale

export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  // Handle Firestore timestamp
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
  
  return new Date(timestamp).toLocaleDateString();
};

export const formatTime = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  // Handle Firestore timestamp
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleTimeString();
  }
  
  return new Date(timestamp).toLocaleTimeString();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateContact = (contact) => {
  return validateEmail(contact) || validatePhone(contact);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

export const generateRandomPhrase = () => {
  const phrases = [
    "Ready to rumble!",
    "Let's do this!",
    "Bring it on!",
    "Game time!",
    "I'm unstoppable!",
    "Victory is mine!",
    "Challenge accepted!",
    "Time to shine!",
    "Let the battle begin!",
    "Born to win!"
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
};

export const getBattleTypeInfo = (type) => {
  const battleTypes = {
    '1v1': {
      name: '1v1 Duel',
      description: 'Classic one-on-one combat',
      icon: '⚔️',
      participants: 2
    },
    '2v2': {
      name: '2v2 Team',
      description: 'Partner up for victory',
      icon: '🤝',
      participants: 4
    },
    '3v3': {
      name: '3v3 Squad',
      description: 'Squad-based warfare',
      icon: '👥',
      participants: 6
    },
    '4v4': {
      name: '4v4 Battle',
      description: 'Large team combat',
      icon: '🏟️',
      participants: 8
    },
    'team': {
      name: 'Team Battle',
      description: 'Large team confrontation',
      icon: '⚡',
      participants: '6-10'
    },
    'free-for-all': {
      name: 'Free-for-All',
      description: 'Everyone for themselves!',
      icon: '💥',
      participants: '3-8'
    }
  };
  
  return battleTypes[type] || battleTypes['1v1'];
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'var(--color-text)',
    active: 'var(--color-red)',
    completed: 'var(--color-yellow)'
  };
  
  return colors[status] || colors.pending;
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const isValidImageFile = (file) => {
  if (!file) return false;
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};

export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const playSound = (soundName) => {
  // Placeholder for sound effects
  // You can implement actual sound playing here
  console.log(`Playing sound: ${soundName}`);
};

export const vibrate = (pattern = [100]) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

export const getRandomColor = () => {
  const colors = [
    'var(--color-red)',
    'var(--color-yellow)',
    'var(--color-balloon-red)',
    'var(--color-balloon-blue)',
    'var(--color-balloon-yellow)'
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

export const animateElement = (element, animation, duration = 500) => {
  if (!element) return;
  
  element.style.animation = `${animation} ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
};
