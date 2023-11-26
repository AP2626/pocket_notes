import React, { useState, useEffect } from 'react';
import './Modal.css'
import SideBar from "../Sidebar/SideBar"
import NotesPage from "../Notes Page/NotesPage"
import { useData } from '../../DataContext/DataContext';
import HomePage from "../Home Page/HomePage"

function Modal() {
  const [selectedColor, setSelectedColor] = useState('#CCC');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { leftMainData } = useData();

  useEffect(() => {
    const storedGroupNames = localStorage.getItem('groupNames');
    if (storedGroupNames) {
      const groupNames = JSON.parse(storedGroupNames);
      const selectedGroup = groupNames.find((group) => group.name === leftMainData);
      if (selectedGroup) {
        setSelectedColor(selectedGroup.color);
      }
    }
  }, [leftMainData]);

  // Check if a group is selected
  const isGroupSelected = leftMainData !== '';

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='modal'>
      <SideBar onColorChange={setSelectedColor} />
      {windowWidth > 768 && (isGroupSelected ? (
        <NotesPage selectedColor={selectedColor} />
      ) : (
        <HomePage />
      ))}
    </div>
  );
}

export default Modal;
