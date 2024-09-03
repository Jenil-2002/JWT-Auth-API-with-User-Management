// Read IP and Port from command-line arguments
const PORT = process.argv[2] || 3000; // First argument or default to 3000
const HOST = process.argv[3] || "127.0.0.1"; // Second argument or default to all interfaces

const appConfig = {
  PORT,
  HOST,
};
module.exports = appConfig;
