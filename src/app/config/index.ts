import * as dotenv from 'dotenv'
dotenv.config()



export default  {
    port:process.env.port,
    database_url: process.env.database_url
}