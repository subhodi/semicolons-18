const app = require('./src/app');

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log(`server is listening on ${port}`);
})