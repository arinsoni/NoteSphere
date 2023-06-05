import React from 'react';
import Notes from '../components/Notes';
const Home = (props) => {
  return (
    <div>
      <Notes showAlert={props.showAlert} />
    </div>
  )
}


export default Home
