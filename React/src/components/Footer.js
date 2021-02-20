import React from 'react'

export const Footer = ({text}) => {

    const style = {
     backgroundColor: "#333",
     color:"white",
     display:"block",
     overflow: "hidden",
     padding:"24px",
     marginTop:"10px",
      bottom: "0",
     width: "100"
    }

    return (
        <div style={style}> 
            <p>{text}</p><p>Github can be found <a href="https://github.com/kiitus/webshop_psql" >HERE</a></p>
        </div>
    )
}
export default Footer