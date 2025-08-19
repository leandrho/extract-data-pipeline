import * as env from 'env-var'
import * as dotenv from 'dotenv';

dotenv.config();

const envs = {
    FILE_LOG: env.get('FILE_LOG').required().asString(),
    APP_NAME: env.get('APP_NAME').required().asString(),
    LOG_LEVEL: env.get('LOG_LEVEL').default('info').asString(),
    NODE_ENV: env.get('NODE_ENV').default('development').asString(),
    PORT: env.get('PORT').default(3000).asPortNumber(),
}

export default envs;