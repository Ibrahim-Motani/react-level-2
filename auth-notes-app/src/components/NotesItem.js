import React, { useContext, useState } from "react";
import NotesContext from "../store/notes-context";
import NoteForm from "./NoteForm";

function NotesItem({ note }) {
    const { deleteNote } = useContext(NotesContext);
    const [isEditing, setIsEditing] = useState(false);
    const [toBeEditedTitle, setToBeEditedTitle] = useState('');
    const [toBeEditedBody, setToBeEditedBody] = useState("");


    const handleEdit = id => {
        setToBeEditedBody(note.body);
        setToBeEditedTitle(note.title);
        setIsEditing(true);
    };

  return (
    <div>
      {!isEditing && (
        <>
          <li>
            <h3>{note.title}</h3>
            {note.body && <p>{note.body}</p>}
          </li>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
          <button onClick={() => handleEdit(note._id)}>Edit</button>
        </>
          )}
          {isEditing && <NoteForm setIsEditingParent={setIsEditing} id={note._id} suppliedTitle={toBeEditedTitle} suppliedBody={toBeEditedBody}></NoteForm> }
    </div>
  );
}

export default NotesItem;
