const app = require("./src/app");
const { port } = require("./src/config/env");

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
