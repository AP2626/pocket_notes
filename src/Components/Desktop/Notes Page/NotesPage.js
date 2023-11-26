import React, { useState, useEffect } from 'react';
import './NotesPage.css';
import { useData } from '../../DataContext/DataContext';
import sendIcon from "../.././../Assets/Icons/send-icon.png";

function NotesPage() {
    const { leftMainData } = useData();

    const getInitials = (name) => {
        return name
            ? name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
            : '';
    };

    const [inputText, setInputText] = useState('');
    const [savedNotes, setSavedNotes] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#CCC');

    useEffect(() => {
        const storedNotes = localStorage.getItem(leftMainData);
        if (storedNotes) {
            setSavedNotes(JSON.parse(storedNotes));
        }
    }, [leftMainData]);

    useEffect(() => {
        const storedGroupNames = localStorage.getItem('groupNames');
        if (storedGroupNames) {
            const groupNames = JSON.parse(storedGroupNames);
            const selectedGroup = groupNames.find(group => group.name === leftMainData);
            if (selectedGroup) {
                setSelectedColor(selectedGroup.color);
            }
        }
    }, [leftMainData]);

    const handleSendNote = () => {
        if (inputText.trim() === '') {
            return;
        }

        const newNote = {
            text: inputText,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };

        const existingNotes = JSON.parse(localStorage.getItem(leftMainData)) || [];
        const updatedNotes = [...existingNotes, newNote];

        localStorage.setItem(leftMainData, JSON.stringify(updatedNotes));
        setSavedNotes(updatedNotes);
        setInputText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendNote();
        }
    }
    return (
        <div className='notes_Page'>
            <div className='notePage_header'>
                <div className='notePage_header_title' >
                    <div className='notePage_header_logo' style={{ backgroundColor: selectedColor }}>
                        {getInitials(leftMainData)}
                    </div>
                    <div className='notePage_header_groupName'>
                        <p>{leftMainData}</p>
                    </div>
                </div>
            </div>
            <div className='notePage_content'>
                <div className='notePage_notes'>
                    <div className='saved_text'>
                        {savedNotes.map((note, index) => (
                            <div className='saved_note_container' key={index}>
                                <div className='date_time'>
                                    <div className='time'>{note.time}</div>
                                    <div className='date'>{note.date}</div>
                                </div>
                                <p className='saved_notes'>{note.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='notePage_input'>
                <div>
                    <textarea
                        className='notePage_inputText'
                        type='text'
                        placeholder='Enter your text here...........'
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    ></textarea>{' '}
                    <img className='sendIcon' src={sendIcon} alt='' onClick={handleSendNote} />
                </div>
            </div>
        </div>
    );
}

export default NotesPage;

