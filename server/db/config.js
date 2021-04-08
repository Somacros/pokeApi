/*
const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );

        console.log('MongoDB is ONLINE');
        
    } catch (error) {
        throw new Error(`Error trying to connect to MongoDB :: ${ error }`)
    }

}


module.exports = {
    dbConnection
}*/