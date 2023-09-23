import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config-local.yaml';

export default () => {
  console.log(
    'join(__dirname, YAML_CONFIG_FILENAME:',
    join(__dirname, YAML_CONFIG_FILENAME),
  );
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
