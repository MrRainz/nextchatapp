import './App.css';
import { useState, useEffect } from 'react'
import DisplayBoard from './components/DisplayBoard'
import MessageInput from './components/MessageInput'
import OnlineUsers from './components/OnlineUsers'
import { Container, Row, Col } from 'reactstrap';
import Socket from './utils/socket'

function App() {
    
    const [messages, updateMessages] = useState([])
    const [displayUsers, updateUsers] = useState([])
    const [currentUser, updateCurrentUser] = useState("")

    useEffect(() => {
        // Once the chat app is loaded, we tell server that we are joining
        Socket.emit('NEW_USER')
      
        Socket.on('GET_CURRENT_USER', newUser => {
            updateCurrentUser(newUser.username)
        })
        Socket.on('UPDATE_USER_LIST', users=>{ //users is an array of all users
            updateUsers((currentUsers) => {
                for(let user of users){
                    if(!currentUsers.map(u => u.username).includes(user.username)){
                        updateMessages((existingMessages) => {
                            let newMessages = [...existingMessages]
                            newMessages.push({username: "System Message", message: `${user.username} has joined the chat!`, timestamp: Date.now(), color: 'blue'})
                            return newMessages
                        })
                    }
                }
                for(let user of currentUsers){
                    if(!users.map(u => u.username).includes(user.username)){
                        updateMessages((existingMessages) => {
                            let newMessages = [...existingMessages]
                            newMessages.push({username: "System Message", message: `${user.username} has left the chat!`, timestamp: Date.now(), color: 'red'})
                            return newMessages
                        })
                    }
                }
                return users
            })
        })
        Socket.on('RECEIVE_BROADCAST', receive => {
            updateMessages((existingMessages) => {
                let newMessages = [...existingMessages]
                newMessages.push({username: receive.username, message: receive.message, timestamp: receive.timestamp, color: 'black'})
                return newMessages
            })
        })
    }, [])


    return (
        <>
            <Container>
                <h1 style={{color: "magenta", padding: "1vh", textAlign: "center"}}>NEXT CHAT APP</h1>
                <Row>
                    <Col className="col-9" style={{padding: "0"}}><DisplayBoard messages={messages} currentUser={currentUser}/></Col>
                    <Col className="col-3" style={{padding: "0"}}><OnlineUsers displayUsers={displayUsers} currentUser={currentUser}/></Col>
                </Row>  
                <Row>
                    <Col className="col-12" style={{padding: "0"}}><MessageInput currentUser={currentUser}/></Col>
                </Row>  
            </Container>

        </>
    );
}

export default App;
