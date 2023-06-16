# Roman Converter

This project provides API for converting numbers to Roman numerals.

## Building and Running the Project

1. Install Node.js and npm if you haven't already.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Install the project dependencies by running the following command:
```
npm install
```
5. Navigate to the server directory with server.js file.
6. Start the server by running the following command:
```
node server.js
```
The server will be running on port 8080 by default.

## API Endpoints

The server exposes the following API endpoint:

- `GET /romannumeral`: Converts a number to a Roman numeral. The number should be provided as a query parameter named `query`. The API will respond with a JSON object containing the input number and its corresponding Roman numeral.

- `GET /metrics`: Retrieves metrics data for monitoring purposes. The metrics are collected using Prometheus and include information about server performance and request counts. The metrics are exposed in Prometheus format.

## Engineering Methodology

The server is implemented using Node.js and Express.js, a popular web application framework for Node.js. The conversion logic is added in a separate function to improve readability.

The project also utilizes the Winston logging library to log server events and errors. Logs are stored in both the console and a file (`app.log`) for easy debugging and troubleshooting.

Metrics monitoring is implemented using the Prometheus library, which collects default metrics related to the server's performance. The metrics are exposed via the `/metrics` endpoint in Prometheus format.

## Testing Methodology

The project includes a test suite to ensure the correctness of the conversion logic and API functionality. The tests are written using the Chai assertion library and the Chai HTTP plugin for making HTTP requests to the server.

To run the tests, use the following command:
```
npx mocha server.test.js
```
