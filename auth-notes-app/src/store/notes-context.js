import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./auth-context";

const NotesContext = createContext({
  notes: [],
  addNote: (formData) => {},
    deleteNote: (id) => { },
  editNote: (id, formData) => {},
});

export const NotesContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [tempNotes, setTempNotes] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://dct-user-auth.herokuapp.com/api/notes", {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        })
        .then(response => {
          const result = response.data;
          console.log(result);
            setNotes(result);
        })
        .catch(error => {
          console.log(error.message);
        });
    } else {
        setNotes([]);
    }
  }, [tempNotes]);
    
    const addNote = formData => {
        axios.post("http://dct-user-auth.herokuapp.com/api/notes", formData, {
            headers: {
                "x-auth": localStorage.getItem("token"),
            },
        }).then(response => {
            const result = response.data;
            console.log(result);
            setTempNotes([...tempNotes, result]);
        }).catch(error => {
            console.log(error.message);
        });
    };

    const deleteNote = (id) => {
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        }).then(response => {
            const result = response.data;
            console.log(result);
            setTempNotes(tempNotes.filter(note => note._id !== id))
        }).catch(error => {
            console.log(error.message);
        });
    }

    const editNote = (id, formData) => {
        axios
          .put(
            `http://dct-user-auth.herokuapp.com/api/notes/${id}`,
            { data:formData },
            {
              headers: {
                "x-auth": localStorage.getItem("token"),
              },
            }
          )
          .then(response => {
            const result = response.data;
            console.log(result);
            setTempNotes([...tempNotes, result]);
          })
          .catch(error => {
            console.log(error.message);
          });
    }

    const contextValue = { notes, addNote, deleteNote, editNote };


  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
