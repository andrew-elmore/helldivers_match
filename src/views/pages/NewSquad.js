import React from 'react';
import SquadEditor from './../components/SquadEditor/index'; // Update the import path as needed
import { useNavigate } from 'react-router-dom';

const NewSquad = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/');
  };

  return (
    <div>
      <SquadEditor onSave={handleSave} liveUpdate={false}/>
    </div>
  );
};

export default NewSquad;
