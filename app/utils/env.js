const PROD_URL = 'https://minesweeper-backend-spark.herokuapp.com';
const DEV_URL = 'http://localhost:4567';

export const BASE_URL = window.location.hostname === 'localhost'?DEV_URL:PROD_URL;