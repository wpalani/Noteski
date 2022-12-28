import { useState } from "react";
import { Noteski } from "../../Noteski";
import Add from "../../components/add/Add";
import Notes from "../../components/notes/Notes";
import NewUserNotice from "../../components/newUserNotice/NewUserNotice";
import Header from "../../components/header/Header";

/**
 * App main page.
 */
const Main = () => {
  const [isNewUser, setIsNewUser] = useState(Noteski.isNewUser());
  const [notes, setNotes] = useState(Noteski.getNotes());

  if (isNewUser) {
    return <NewUserNotice updateIsNewUser={setIsNewUser}/>;
  }

  return (
    <div>
      <Header setNotes={setNotes}/>
      <Add notes={notes} setNotes={setNotes} />
      {notes && <Notes notes={notes} setNotes={setNotes} />}
    </div>);
}

export default Main;