import { useState } from 'react'
import { Form, Input, Button } from 'reactstrap'
import Socket from '../utils/socket'

const MessageInput = ({currentUser}) => {
    const [text, updateText] = useState("")
    const [button, updateButton] = useState(true)
    const [color, changeColor] = useState("black")
    
    const handleChange = (e) => {
        updateText(e.target.value)
        if (e.target.value.length > 0 && e.target.value.length <=500) {
            updateButton(false)
            changeColor("black")
        }
        else if (e.target.value.length > 500) {
            changeColor("red")
            updateButton(true)
        }
        else {
            updateButton(true)
            changeColor("black")
        }
    }

    const handleSubmit = () => {
        Socket.emit("BROADCAST_MESSAGE", {username: currentUser, message: text, timestamp: Date.now()})
        updateText("")
        updateButton(true)
    }

    const handleKeyboardSubmit = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            if (e.target.value.length > 0 && e.target.value.length <= 500) {
                Socket.emit("BROADCAST_MESSAGE", {username: currentUser, message: text, timestamp: Date.now()})
                updateText("")    
            }
        }
    }

    return (
        <div className="messageInput">
                <Form style={{display: "flex", height: "100%"}}>
                    <div id="inputBox">
                        <Input type="textarea" name="text" placeholder="Type your message here..." value={text} onKeyDown={e => handleKeyboardSubmit(e)} onChange={e => handleChange(e)} id="inputText"></Input>
                    </div>
                    <Button color="primary" onClick={handleSubmit} id="inputButton" disabled={button}>Send</Button>
                    <p style={{position: "absolute", top: "18vh", right: "10vw", color: color}}>{text.length}</p>
                </Form>
        </div>
    )
}

export default MessageInput