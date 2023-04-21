import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component";
import {MeetingList } from "./components/meeting-list.component";
import { CreateMeeting } from './components/meeting-add.component';
import EditMeeting from './components/meeting-edit.component';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/meeting" element={<MeetingList />} />
          <Route exact path="/createMeeting" element={<CreateMeeting />} />{/* Done */}
          <Route exact path="/editMeeting/:id" element={EditMeeting } />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
