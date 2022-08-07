import { useState, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm';

const URL = 'https://rest-api-without-db.herokuapp.com/users'

function App() {
  const [users, setUsers] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updateButton, setUpdateButton] = useState(false)
  const [editedUser, setEditedUser]= useState({username: '', email: ''})
  const [updatedId, setUpdatedId]= useState('')

  const getAllUser = () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch')
        }
        return res.json()
      })
      .then((data) => {
        setUsers(data.users)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getAllUser()
  }, [])

  //delete user
  const handleDelete = (id) => {
    fetch(URL + `/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not delete')
        }
        getAllUser()
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  //Add user
  const handleAddUser = (newUser) => {
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not create')
        }
        getAllUser()
      })
      .catch((err) => {
        setError(err.message)
      })
  }
//Edit
  const handleEdit=(id)=>{
    setUpdateButton(true)
    const filteredUser= users.filter((user)=>user.id===id)
    setEditedUser({
      username: filteredUser[0].username,
      email: filteredUser[0].email,
    })
    setUpdatedId(id)
  }
// Update user
  const handleUpdateUser=(updated)=>{
    fetch(URL+ `/${updatedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not update')
        }
        getAllUser()
        setUpdateButton(false)
      })
      .catch((err) => {
        setError(err.message)
      })

  }


  return (
    <div>
      <h1>User Management Application</h1>
      <p>You can input user information/update user information/delete user information by using this app</p>
      {isLoading && <h2>...loading</h2>}
      {error && { error }}
      {
        updateButton ?
          <UserForm btnText='Update user' editedUser={editedUser} addUser={handleUpdateUser} /> :
          <UserForm btnText='Add user' addUser={handleAddUser} />
      }
      <section>
        {
          users && users.map((user) => {
            const { id, username, email } = user
            return (
              <article className='card' key={id}>
                <p>Name: {username}<br />
                  Email: {email}</p>
                <button className='btn' onClick={()=>handleEdit(id)}>Edit</button>
                <button className='btn' onClick={() => handleDelete(id)} >Delete</button>
              </article>
            )
          })
        }
      </section>
    </div>
  );
}

export default App;
