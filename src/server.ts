import app from "./app.js";

const port: number = +process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
