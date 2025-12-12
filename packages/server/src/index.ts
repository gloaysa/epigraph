import 'dotenv/config';
import { app } from './app';

const { PORT = 3003 } = process.env;
const now = new Date();
app
  .listen(PORT, () => {
    console.info('Server is running on http://localhost:' + PORT);
    console.info(`Took in seconds ${(new Date().getTime() - now.getTime()) / 1000}`);
  })
  .on('error', (err) => {
    console.error(`Failed to start the server: ${err.message}`);
    process.exit(1);
  });
