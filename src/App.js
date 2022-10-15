import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { ModalComponent } from './components/modal.component';

function App() {

  const nullableEntry = {
    name: '',
    email: '',
    phone: '',
    address: '',
  }
  const removeXRef = useRef()

  const [isCardStyle, setIsCardStyle] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [selectedUser, setSelectedUser] = useState(nullableEntry);

  const addUser = (user) => {
    setUsers([...users, user]);
  }
  
  const removeUser = (e, i) => {
    setSelectedUser(nullableEntry);
    setUsers(users.filter((users, ind) => ind !== i));
  }

  const toggleModalShow = (truth) => {
    setShowModal(truth)
  }

  const onMouseEnter = (i) => {
    setHoveredItem(i)
  }

  const onMouseLeave = (i) => {
    setHoveredItem(-1)
  }

  const onSelectUser = (e, user) => {
    if(e.target !== removeXRef.current) {
      setSelectedUser(user)
    }
  }

  return (
    <div className="App">
      {showModal && <div className='modal-component-background-blur'></div>}
      {showModal && <ModalComponent onCreateUser={addUser} toggleModalShow={(truth) => {toggleModalShow(truth)}} />}
      <header className="App-header">
        <h1 style={{ marginLeft: '20px' }}>users</h1><div style={{ width: '10px', height: '20px', background: '#fff', margin: 'auto 0 auto 0' }}></div>
      </header>
      <div className='app-separator'>
        <button onClick={() => {
          setShowModal(true);
        }}>Create User</button>
      </div>
      <div className='app-content-container'>
        <div className='left-sidebar'>
          
          <span style={{ fontSize: '11px', textAlign: 'right', cursor: 'pointer', color: 'var(--yale-blue)', marginBottom: '10px'}} onClick={() => setIsCardStyle(!isCardStyle)}>{isCardStyle ? 'card' : 'list'} view</span>
          
          <h3>
            user@users<code style={{ color: 'var(--yale-blue)' }}>:usr/</code><code style={{ color: '#fff' }}>$ ls</code>
          </h3>


          <div className='users-list'>
            {
              users.map((user, i) => (
                isCardStyle ? (
                  <div onClick={(e) => onSelectUser(e, user)} onMouseEnter={() => onMouseEnter(i)} onMouseLeave={onMouseLeave} key={i} className='user-item-card' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}><div style={{ display: 'flex', flexDirection: 'column' }}><ul>{user.name}</ul><ul style={{ color: '#fff', marginBottom: '5px' }}>{user.email}</ul></div>{ hoveredItem === i && <div><span style={{ marginRight: '10px', cursor: 'pointer' }} ref={removeXRef} onClick={(e) => removeUser(e, i)} className='remove-x'>x</span></div> }</div>
                ) : (
                  <div onClick={(e) => onSelectUser(e, user)} onMouseEnter={() => onMouseEnter(i)} onMouseLeave={onMouseLeave} key={i} className='user-item' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><div><ul>{user.name}</ul></div>{ hoveredItem === i && <div><span  ref={removeXRef} onClick={(e) => removeUser(e, i)} className='remove-x'>x</span></div> }</div>
                )
              ))
            }
          </div>
        </div>
        <div className='user-display-container'>
          <div className='user-profile-display'>
            <div className="user-profile-component-profile-circle">
                <div style={{ width: '25px', height: '25px', borderRadius: '50%', margin: 'auto auto 0', border: '1px solid rgba(255,255,255,0.5)' }}></div>
                <div style={{ width: '50px', height: '25px', borderTopLeftRadius: '75%', borderTopRightRadius: '75%', border: '1px solid rgba(255,255,255,0.5)', margin: '0 auto auto'}}></div>
            </div>
            {
              selectedUser.name ? (
                <div className='user-profile-details'>
                  <div className='user-item-display'><div><ul style={{ width: '100px' }}>Name: </ul></div><div><ul style={{ color: '#fff' }}>{selectedUser.name}</ul></div></div>
                  <div className='user-item-display'><div><ul style={{ width: '100px' }}>Phone: </ul></div><div><ul style={{ color: '#fff' }}>{selectedUser.phone}</ul></div></div>
                  <div className='user-item-display'><div><ul style={{ width: '100px' }}>Email: </ul></div><div><ul style={{ color: '#fff' }}>{selectedUser.email}</ul></div></div>
                  <div className='user-item-display'><div><ul style={{ width: '100px' }}>Address: </ul></div><div><ul style={{ color: '#fff' }}>{selectedUser.address}</ul></div></div>
                </div>
              ) : (
                <span style={{ margin: '20px' }}><ul style={{ color: '#fff', textAlign: 'center' }}>Create and select user to display their detail</ul></span>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
