import React, { useState, useEffect, useRef } from 'react';
import './SideBar.css';
import { useData } from '../../DataContext/DataContext';
import NotesPage from "../Notes Page/NotesPage"; 
import BackIcon from "../../../Assets/Icons/back-icon.png"


function SideBar({ onColorChange }) {
  const { leftMainData, updateLeftMainData } = useData();                              // eslint-disable-next-line
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isCreateFunctionVisible, setIsCreateFunctionVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#CCC');
  const [groupNames, setGroupNames] = useState([]);                                    // eslint-disable-next-line
  const [selectedGroupNotes, setSelectedGroupNotes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
  const [showNotesPage, setShowNotesPage] = useState(false);

  const createFunctionRef = useRef();

  const toggleCreateFunction = () => {
    setIsCreateFunctionVisible(!isCreateFunctionVisible);
  };

  const handleCreateGroup = () => {
    const updatedGroupNames = [...groupNames, { name: groupName, color: selectedColor }];
    localStorage.setItem('groupNames', JSON.stringify(updatedGroupNames));
    localStorage.setItem(groupName, JSON.stringify([]));

    setGroupNames(updatedGroupNames);
    setGroupName('');
    onColorChange(selectedColor);
    setIsCreateFunctionVisible(false);
  };

  const handleLeftTitleClick = (group) => {
    if (isMobile) {
      updateLeftMainData(group.name);
      setShowNotesPage(true);
    } else {
      updateLeftMainData(group.name);
    }
  };

  const handleBackButtonClick = () => {
    setShowNotesPage(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const createFunction = createFunctionRef.current;
      const button = document.querySelector('.create_button');

      if (
        createFunction &&
        !createFunction.contains(event.target) &&
        !button.contains(event.target)
      ) {
        setIsCreateFunctionVisible(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const storedGroupNames = localStorage.getItem('groupNames');
    if (storedGroupNames) {
      setGroupNames(JSON.parse(storedGroupNames));
    }
  }, []);

  useEffect(() => {
    const storedNotes = localStorage.getItem(leftMainData);
    if (storedNotes) {
      setSelectedGroupNotes(JSON.parse(storedNotes));
    }
  }, [leftMainData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
// eslint-disable-next-line
  const handleWheel = (e) => {
    setScrollOffset((prevOffset) => prevOffset + e.deltaY);
    e.preventDefault();
  };

 

  return (
    <div className={isMobile && showNotesPage ? 'mobile_notes_page' : 'side_bar'}>
      <div className='sidebar_container'>
        <div className='sidebar_heading'>Pocket Notes</div>
        <div className='button'>
          <button className='create_button' onClick={toggleCreateFunction}>
            <b>+</b> &nbsp; Create Notes group
          </button>
        </div>
      </div>
      {isCreateFunctionVisible && (
        <div className='create_function' ref={createFunctionRef} >
          <p className='createFunction_title'>Create New Notes group</p>
          <div className='groupName'>
            <label className='create_function_text' htmlFor=''>
              Group Name
            </label>
            <input
              className='create_function_input'
              type='text'
              placeholder='Enter your group name....'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className='selectColor'>
            <label className='create_function_text' htmlFor=''>
              Choose colour
            </label>
            <div className='colors'>

              <div className='color'
                style={{
                  backgroundColor: '#B38BFA',
                  border: selectedColor === '#B38BFA' ? '2px solid black' : 'none'
                }}
                onClick={() => setSelectedColor('#B38BFA')}>
              </div>

              <div className='color'
                style={{
                  backgroundColor: '#FF79F2',
                  border: selectedColor === '#FF79F2' ? '2px solid black' : 'none'
                }}
                onClick={() => setSelectedColor('#FF79F2')}>
              </div>

              <div className='color'
                style={{
                  backgroundColor: '#43E6FC',
                  border: selectedColor === '#43E6FC' ? '2px solid black' : 'none'
                }}
                onClick={() => setSelectedColor('#43E6FC')}>
              </div>

              <div className='color'
                style={{
                  backgroundColor: '#F19576',
                  border: selectedColor === '#F19576' ? '2px solid black' : 'none'
                }}
                onClick={() => setSelectedColor('#F19576')}>
              </div>

              <div className='color'
                style={{
                  backgroundColor: '#0047FF',
                  border: selectedColor === '#0047FF' ? '2px solid black' : 'none'
                }}
                onClick={() => setSelectedColor('#0047FF')}>
              </div>

              <div className='color'
                style={{
                  backgroundColor: '#6691FF',
                  border: selectedColor === '#6691FF' ? '2px solid black' : 'none'
                }}
                onClick={() => setSelectedColor('#6691FF')}>
              </div>

            </div>
          </div>
          <div>
            <button className='create_btn' onClick={handleCreateGroup}>
              Create
            </button>
          </div>
        </div>
      )}
      {showNotesPage ? (
        <div className={isMobile ? 'mobile_notes_page_content' : 'notes-page-container'}>
        <img className='back-button' onClick={handleBackButtonClick} src={BackIcon} alt="" />
          <NotesPage />
        </div>
      ) : (
        <div className='sideBar_leftTitle'>
          {groupNames.map((group, index) => (
            <div key={index} className='groupNameTitle' onClick={() => handleLeftTitleClick(group)}>
              <div className='groupNameTitle_logo' style={{ backgroundColor: group.color }}>
                {group.name ? group.name.split(' ').map(word => word[0]).join('').toUpperCase() : ''}
              </div>
              <div className='leftMain'>
                {group.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SideBar;
