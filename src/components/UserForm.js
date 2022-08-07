import React, {useState, useEffect} from 'react'


const UserForm = ({editedUser,addUser,btnText}) => {
    const [inputValue, setInputValue]= useState({username: '', email: ''})

    const handleInputChange=(e)=>{
        const enteredName= e.target.name
        const enteredValue= e.target.value
        setInputValue(prevState=>{
            return {...prevState, [enteredName]: enteredValue}
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        addUser(inputValue)
        setInputValue({username: '', email: ''})
    }
    useEffect(() => {
      setInputValue({
        username: editedUser.username,
        email: editedUser.email,
      })
    }, [editedUser])
    

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name:</label>
        <input type="text" id='username' name='username' value={inputValue.username} onChange={handleInputChange} /><br/>
        <label htmlFor="email">Email:</label>
        <input type="email" id='email' name='email' value={inputValue.email} onChange={handleInputChange} /><br/>
        <button className="btn" type='submit'>{btnText}</button>
        </form>
    </div>
  )
}

UserForm.defaultProps = {
    editedUser:{
        username: '',
        email: ''
    }
}

export default UserForm