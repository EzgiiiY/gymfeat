#!/usr/bin/env python

import asyncio
import datetime
import random
import websockets
import json

async def time(websocket, path):
    count = 0
    while True:
        message = await websocket.recv() # receive the message e.g. the pose data (as string)
        pose = json.loads(message) # conver the pose string to a pose object
        print(pose['score']) # prints the score of pose
        response = {"hello": "gymfeat"}
        # once the messages are cumulated to a window of 3, send a response
        if count % 3 == 0:
            await websocket.send(str(response)) 
        count += 1

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()