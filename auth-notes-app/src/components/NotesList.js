import React, { useContext} from 'react';
import NotesContext from "../store/notes-context";
import NotesItem from './NotesItem';

function NotesList() {
    const { notes } = useContext(NotesContext);

    return (
      <div>
        <h2>My Notes</h2>
            {notes.length === 0 && <h3>No Notes found add your first note</h3>}
            {notes.length > 0 && (
                <ul>
                    {notes.map(note => {
                        return (
                          <NotesItem key={note._id} note={note}></NotesItem>
                        );
                    })}
                </ul>
            ) }
      </div>
    );
}

export default NotesList;
