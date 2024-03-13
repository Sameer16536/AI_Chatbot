import {connect,disconnect} from 'mongoose'


//Connect
async function conneectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL)
        // await connect('mongodb+srv://Sameer:Sameer%401482@user.cc5veew.mongodb.net/?retryWrites=true&w=majority&appName=user')
    } catch (error) {
        console.log(error)
        throw new Error("Failed to Connect to the Database")
    }
}

//Disconnect
async function  disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error)
        throw  new Error( "Failed to Disconnect From The Database");
    }
}

export {conneectToDatabase,disconnectFromDatabase};