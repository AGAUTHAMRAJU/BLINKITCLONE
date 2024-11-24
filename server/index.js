// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// dotenv.config()
// import cookieParser from 'cookie-parser'
// import morgan from 'morgan'
// import helmet from 'helmet'
// import connectDB from './config/connectDB.js'
// import userRouter from './route/user.route.js'
// import categoryRouter from './route/category.route.js'
// import uploadRouter from './route/upload.router.js'
// import subCategoryRouter from './route/subCategory.route.js'
// import productRouter from './route/product.route.js'
// import cartRouter from './route/cart.route.js'
// import addressRouter from './route/address.route.js'
// import orderRouter from './route/order.route.js'

// const app = express()
// // app.use(cors({
// //     credentials : true,
// //     origin : "https://blinkit.netlify.app/"
// // }))
// const allowedOrigins = [
//     'https://blinkit.netlify.app', // Your Netlify frontend URL
//     'https://blinkitclone-vy7b.onrender.com'    
// ];
// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow specific origins (Netlify) and also allow local development (localhost)
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);  // Allow the origin
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
// }));
// app.use(express.json())
// app.use(cookieParser())
// app.use(morgan())
// app.use(helmet({
//     crossOriginResourcePolicy : false
// }))

// const PORT = 8080 || process.env.PORT

// app.get("/",(request,response)=>{
//     ///server to client
//     response.json({
//         message : "Server is running " + PORT
//     })
// })

// app.use('/api/user',userRouter)
// app.use("/api/category",categoryRouter)
// app.use("/api/file",uploadRouter)
// app.use("/api/subcategory",subCategoryRouter)
// app.use("/api/product",productRouter)
// app.use("/api/cart",cartRouter)
// app.use("/api/address",addressRouter)
// app.use('/api/order',orderRouter)

// connectDB().then(()=>{
//     app.listen(PORT,()=>{
//         console.log("Server is running" + PORT)
//     })
// })

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
    'https://blinkit.netlify.app',  // Netlify frontend
     // Another backend domain (if applicable)
];

// CORS setup
app.use(cors({
    origin: function (origin, callback) {
        // Allow specific origins and allow requests from localhost during development
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,  // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
}));

// Body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // You can specify a log format here
app.use(helmet({ crossOriginResourcePolicy: false }));

// Ensure the correct PORT is used
const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
    response.json({ message: "Server is running on port " + PORT });
});

// API routes
app.use('/api/user', userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use('/api/order', orderRouter);

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
});

