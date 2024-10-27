import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_PATH, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_PATH, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};
