import React from "react";
import AddNote from '../components/NoteForm';
import NotesList from "../components/NotesList";

function MyNotes() {

    return (
      <div>
        <h2>Add Note</h2>
        <AddNote></AddNote>
        <NotesList></NotesList>
      </div>
    );
}

export default MyNotes;