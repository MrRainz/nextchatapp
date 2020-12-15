const OnlineUsers = ({displayUsers, currentUser}) => {
    return (
        <div className="onlineUsers">
            <div style={{margin: "1vh"}}>
                <h4 style={{fontSize: "3vh"}}>Users Online:</h4>
                {displayUsers.map((user, index)=>{
                    return(
                        <div key={index} style={{color: user.username===currentUser? 'purple':'black'}}>{user.username}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default OnlineUsers