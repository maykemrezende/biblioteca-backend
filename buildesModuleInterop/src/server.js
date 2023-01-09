"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
console.log(port);
app_1.app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
