import React, { useState, useContext } from 'react';
import NotesContext from '../store/notes-context';

function NoteForm({ id, suppliedTitle, suppliedBody, setIsEditingParent }) {
  const { addNote, editNote } = useContext(NotesContext);

  const [title, setTitle] = useState(suppliedTitle !== "" ? suppliedTitle : "");
  const [body, setBody] = useState(suppliedBody !== "" ? suppliedTitle : "");

  const isEditing = !!(suppliedTitle || suppliedBody);

  const handleSubmit = event => {
    event.preventDefault();
    if (title.trim().length > 0) {
      addNote({ title, body });
      setTitle("");
      setBody("");
    }
    return;
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    if (title.trim().length > 0) {
      editNote(id, { title, body });
      setTitle("");
        setBody("");
        setIsEditingParent(false);
    }
    return;
  };

  return (
    <form
      onSubmit={
        isEditing
          ? event => handleEdit(event, id)
          : event => handleSubmit(event)
      }
    >
      <input
        value={title}
        onChange={event => setTitle(event.target.value)}
        type="text"
        placeholder="Title"
      />{" "}
      <br />
      <textarea
        value={body}
        onChange={event => setBody(event.target.value)}
        placeholder="Body"
      ></textarea>{" "}
      <br />
          <button type="Submit">Save</button>
          {isEditing && <button onClick={() => setIsEditingParent(false)}>Cancel</button> }
    </form>
  );
}

export default NoteForm
