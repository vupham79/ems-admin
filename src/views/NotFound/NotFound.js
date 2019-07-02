import React from 'react';
import { Link} from 'react-router-dom';
import NotFoundImg from '../../asset/notfound.gif';

class NotFoundView extends React.Component {
  render() {
    return (
      <div >
      <img 
        alt='Not found'
        src={NotFoundImg} 
        style={{ width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }}
       />
      <center><Link to="/">Return to Home Page</Link></center>
      </div>
    )
  }
}

export default NotFoundView;