import React from 'react'

const Notification = ({ message }) => { //component for showing messages
    const messageStyle ={
        color:"green",
        marginTop: 20,
        marginBottom: 20,
        border: "solid",
        padding:10
    }
    if (message === null) {
      return null
    }
  
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }

  export default Notification