// // import express from "express"
// // import cors from "cors"
// // import 'dotenv/config'
// // import { clerkMiddleware, requireAuth } from '@clerk/express'
// // import aiRouter from "./routes/aiRoutes.js"
// // import connectCloudinary from "./config/cloudinary.js"


// // const app = express()

// // await connectCloudinary()

// // app.use(cors())
// // app.use(express.json())
// // app.use(clerkMiddleware())


// // app.get("/", (req, res) => {
// //     res.send("Server is live")
// // })


// // app.use("/api/ai", requireAuth(), aiRouter);

// // const PORT = process.env.PORT || 3000;

// // app.listen(PORT, () => {
// //     console.log("Server is running on port", PORT);

// // })




// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import { clerkMiddleware } from "@clerk/express";
// import aiRouter from "./routes/aiRoutes.js";
// import connectCloudinary from "./config/cloudinary.js";

// const app = express();

// await connectCloudinary();

// app.use(cors());
// app.use(express.json());
// app.use(clerkMiddleware());

// // ✅ public route
// app.get("/", (req, res) => {
//   res.send("Server is live");
// });

// // ✅ attach routes (auth handled inside)
// app.use("/api/ai", aiRouter);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });


import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
connectCloudinary();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});