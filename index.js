import 'dotenv/config.js'
import express from 'express'
import { dbConnection } from './db/connection.js';
import { allRoutes } from './src/modules/routes.js';
import { appError } from './src/utils/appError.js';
import cors from 'cors'
import morgan from 'morgan';

const app = express()
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

app.use(morgan('dev'))

dbConnection();


allRoutes(app);

app.all("*", (req, res,next) =>{
  next(new appError(`url not found : ${req.originalUrl} `,404))
})
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.statusCode).json({message: err.message, stack:err.stack})
  })

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:3000`))