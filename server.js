const config = require('./src/config/env');
const app = require('./src/app');

app.get('/', (req, res) => {
    res.send('Hello AQ');
  });

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
