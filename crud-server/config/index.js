require('dotenv').config()

const config = () => {
    switch(process.env.NODE_ENV && process.env.NODE_ENV.trim()){
        case 'development':
            return {
                PORT : process.env.PORT,
                DB : process.env.DB,
            }
        default :
            return {
                PORT : process.env.PORT,
                DB : process.env.DB,
            }
    }
}

module.exports = config
