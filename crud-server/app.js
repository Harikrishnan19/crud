const express = require('express')
const { connect } = require('mongoose')
const cors = require('cors')
const {DB, PORT} = require('./config')()
const logger = require('./utils/logger')
const userRoute = require('./routes/user')

const app = express();

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/user', userRoute)


// start app function
const startApp = async () => {
    try {
        await connect(DB, { useUnifiedTopology: true, useNewUrlParser: true })
        logger.info(`Successfully connected with the Database \n${DB}`)
        app.listen(PORT, () => logger.info(`Server started on PORT ${PORT}`)
    );
    } catch (err) {
        logger.error(`Unable to connect with the Database \n${err}`)
    }
}

startApp()
