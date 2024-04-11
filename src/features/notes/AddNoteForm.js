import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const AddNoteForm = () => {
  const [formData, setFormData] = useState({
    noteTitle: '',
    noteContent: ''
  });
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const onFormDataChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (name === 'noteTitle') {
      setTitleError(value.length === 0);
    } else if (name === 'noteContent') {
      setContentError(value.length === 0);
    }
    setCanSave(formData.noteTitle.length > 0 && formData.noteContent.length > 0);
  }

  const onSaveNoteClicked = async () => {
    if (!titleError && !contentError) {
      try {
        console.log(formData)
        await axios.post('https://notepad-backend-027c.onrender.com/api/add-note', formData);
        toast('New Note added successfully');
        setFormData({ noteTitle: '', noteContent: '' });
      } catch (error) {
        console.error('Error adding note:', error);
        toast.error('Failed to add note');
      }
    }
  }

  return (
    <div>
      <section className='note-form-section'>
        <h2 className='my-4 fs-16'>Add New Note</h2>
        <form className='note-form'>
          <div className='form-element'>
            <label htmlFor='noteTitle' className='form-label'>Title:</label>
            <input type="text" id="noteTitle" name="noteTitle" placeholder='Note title here ...' onChange={onFormDataChange} className="form-control" value={formData.noteTitle} />
            <span className='form-error-text'>{titleError ? "Title can't be empty!" : ""}</span>
          </div>

          <div className='form-element'>
            <label htmlFor='noteContent' className='form-label'>Content:</label>
            <textarea id="noteContent" name="noteContent" placeholder='Note content here ...' onChange={onFormDataChange} className="form-control" rows="10" value={formData.noteContent}></textarea>
            <span className='form-error-text'>{contentError ? "Content can't be empty!" : ""}</span>
          </div>

          <button type="button" onClick={onSaveNoteClicked} className="btn btn-default" disabled={!canSave}>Save Note</button>
          <ToastContainer />
        </form>
      </section>
    </div>
  )
}

export default AddNoteForm;
