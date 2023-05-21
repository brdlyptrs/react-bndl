import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const DEMO_ROOT = resolve(__dirname, '..', '..');
export const BUILD_DIR = resolve(DEMO_ROOT, 'build');