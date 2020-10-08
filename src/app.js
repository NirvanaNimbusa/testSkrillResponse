const connection = require("./base/database/mongoDB");
const app = require("./preApp");

connection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
