const Notification = ({ message, type }) => {
    
    const succeesStyle = {
        color: 'green',
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    
    const errorStyle = {
        color: 'red',
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    
    
    const styles = {
        error: errorStyle,
        succees: succeesStyle,
    }
    

    if (message === null) {
        return null
    }
    
    return (
        <div className='error' style={styles[type]} >
        {message}
        </div>
        )
    }
    
    export default Notification