import moment from 'moment'
import { useRef, useEffect } from 'react'

const DisplayBoard = ({messages, currentUser}) => {
    
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
        
    }

    useEffect(scrollToBottom, [messages]);


    return (
        <div className="displayBoard">
            {messages.map((message, index)=>{
                return <div className="message" ref={messagesEndRef} key={index}>
                            <h4 style={{margin: "0", fontWeight: "bold", fontSize: "3vh", color: message.username===currentUser? 'purple':'black'}}>{message.username} </h4>
                            <p style={{margin: "auto", marginLeft: "0", paddingTop: "2vh", fontSize: "2vh", color: message.color}}>{message.message}</p>
                            <small style={{textAlign: "right"}}>{moment(message.timestamp).startOf('hour').fromNow()} </small>
                        </div>
            })}
        </div>
    )
}

export default DisplayBoard