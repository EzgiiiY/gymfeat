// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Workout } = initSchema(schema);

export {
  Workout
};