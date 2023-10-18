import { app } from "./app.js";
import connectDB from "./utils/db.js";

const PORT=process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`);
    connectDB()
})
