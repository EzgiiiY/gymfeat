import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Workout {
  readonly id: string;
  readonly username: string;
  readonly workout_id: number;
  readonly date: string;
  constructor(init: ModelInit<Workout>);
  static copyOf(source: Workout, mutator: (draft: MutableModel<Workout>) => MutableModel<Workout> | void): Workout;
}