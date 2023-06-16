const express = require('express');
const app = express();
const port = 8080;

// Logging
const winston = require('winston');
const { format } = winston;
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ],
});

// Metrics
const prometheus = require('prom-client');
prometheus.collectDefaultMetrics();

// Route for Roman conversion
app.get('/romannumeral', (req, res) => {
  const query = req.query.query;

  if (!query || isNaN(query) || query < 1 || query > 3999) {
    res.status(400).send('Invalid input. Please provide a number between 1 and 3999.');
    logger.warn('Invalid input', { input: query });
    return;
  }

  const responseObject = {
    input: query,
    output: convertToRoman(parseInt(query))
  };
  logger.info('Roman conversion request', responseObject);
  res.json(responseObject);
});

// Function to convert a number to Roman numeral
function convertToRoman(number) {
  const numToRomanMap = [[1000, 'M'], [900, 'CM'], [500, 'D'],
                  [400, 'CD'], [100, 'C'], [90, 'XC'],
                  [50, 'L'], [40, 'XL'], [10, 'X'],
                  [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let output = '';
  for(let ind=0; ind<numToRomanMap.length; ind++){
    const [val, char] = numToRomanMap[ind];
    while(number >= val){
        number -= val;
        output += char;
    }
  }
  return output;
}

// Route for Metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.send(await prometheus.register.metrics());
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  logger.info(`Server started on port ${port}`);
});

// Export the server object
module.exports = server;
