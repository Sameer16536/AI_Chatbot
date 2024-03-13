import app from "./app.js"
import { conneectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT || 5000;





//database Connection
conneectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT} & connected to Database`)
    })
  })
  .catch((err) => console.log(err))



