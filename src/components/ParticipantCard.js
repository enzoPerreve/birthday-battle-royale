import React from 'react';

const ParticipantCard = ({ participant }) => {
  const getAvatarContent = () => {
    if (participant.photo) {
      return <img src={participant.photo} alt={participant.name} />;
    }
    return participant.name.charAt(0).toUpperCase();
  };

  return (
    <div className="participant-card fade-in">
      <div className="participant-image">
        {getAvatarContent()}
      </div>
      <div className="participant-name">{participant.name}</div>
      <div className="participant-phrase">"{participant.phrase || 'Ready to rumble!'}"</div>
      <div className="participant-preferences">
        <span 
          className={`preference-icon ${participant.preferences?.alcohol ? 'active' : ''}`}
          title="Alcohol"
        >
          🍷
        </span>
        <span 
          className={`preference-icon ${participant.preferences?.spicy ? 'active' : ''}`}
          title="Spicy Food"
        >
          🌶️
        </span>
      </div>
    </div>
  );
};

export default ParticipantCard;
