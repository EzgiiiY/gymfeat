import { stopSubmit } from 'redux-form';
import Amplify, { Auth, API, graphqlOperation  } from 'aws-amplify';
import {
  CALENDAR_UPDATE_FAIL,
  CALENDAR_UPDATE_SUCCESS
} from './types';
import * as Mutation from '../graphql/mutations';
import * as Queries from '../graphql/queries';

export const addtoDB = (date, workoutId) => async dispatch => {
    // const todo = { name: "My first todo", description: "Hello world!" };
    // const workout = new Model.Workout({id: "15", username: "talha", date: "todaysdate", workout_id: 15});
    const user = await Auth.currentUserInfo();

    const workout = {
      username: user.username,
      date: date,
      workout_id: workoutId
    }
    try {
      await API.graphql(graphqlOperation(Mutation.createWorkout, {input: workout}));

      dispatch({
        type: CALENDAR_UPDATE_SUCCESS,
      });
    } catch (e) {
      console.log("error adding to db: ", e);
      dispatch({
        type: CALENDAR_UPDATE_FAIL
      });
    }
  }


  export const getUserWorkouts = () => async dispatch => {
    const user = await Auth.currentUserInfo();
    // get all
    //const allWorkouts = await API.graphql({ query: Queries.listWorkouts });
    //console.log("all workouts: ", allWorkouts);

    // get the workout _id == id. id is the automatically assigned uuid in this case.
    // this `Queries.getWorkout` only works for fetching via the id, this is not rly useful for us.
    // the uuid can be found in dynamodb via awsconsole or get the uuid through querying for all by also filtering
    // const workout = await API.graphql({ query: Queries.getWorkout, variables: { id: "<some uuid>" }});

    // refer to: https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js#filtered-and-paginated-queries for filters
    let filter = {
      username: {
          eq: user.username
      }
    };

    // list all workouts whose _username == username
    // this is better for us because we can filter by anything and not only by the uuid as it was above 
    const workouts = await API.graphql({ query: Queries.listWorkouts, variables: {filter: filter}});
    console.log("filtered workouts: ", workouts.data.listWorkouts.items);
    dispatch({
        type: CALENDAR_UPDATE_SUCCESS,
        payload:workouts.data.listWorkouts.items
      });
    


  }

  export const updateInDB = () => async dispatch => {
    const uuid = "7fab4ed0-5cc3-4148-b131-4c94557986e4";
    let workout = await API.graphql({ query: Queries.getWorkout, variables: { id: uuid }});
    console.log("prev workout: ", workout);
    let prevDate = workout.data.getWorkout.date;
    console.log("prev workout's date: ", prevDate);

    const workoutDetails = {
      id: uuid,
      date: prevDate + " updated",
    };
    const updatedWorkout = await API.graphql({ query: Mutation.updateWorkout, variables: {input: workoutDetails}});

    workout = await API.graphql({ query: Queries.getWorkout, variables: { id: uuid }});
    console.log("current workout: ", workout);
    console.log("current workout's date: ", workout.data.getWorkout.date);
  }

  export const deleteUserWorkout = (id) => async dispatch => {
    const uuid = id;
    const workoutDetails = {
      id: uuid
    };
    const deletedWorkout = await API.graphql({ query: Mutation.deleteWorkout, variables: {input: workoutDetails}});
  }