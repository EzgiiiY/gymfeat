#!/usr/bin/env python

import asyncio
import datetime
import random
import websockets
import json
import numpy as np
from scipy import signal
import math

class Config:
    repetition = 0
    status = 0
    nameToLabel = {"nose":0, "leftEye":1, "rightEye":2, "leftEar":3, "rightEar":4, "leftShoulder":5, 
    "rightShoulder":6, "leftElbow":7, "rightElbow":8, "leftWrist":9, "rightWrist":10, "leftHip":11, "rightHip":12, 
    "leftKnee":13, "rightKnee":14, "leftAnkle":15, "rightAnkle":16}
    types = {0:{"name": "Squat" ,"p1":"leftKnee", "p2":"leftHip", "p3":"leftShoulder","stable_min":165, "stable_max":195 ,"peak_min":40 ,"peak_max":75}}
    cum_arrays = []

def getAngle(a, b, c):
    if a[0] == 0 or a[1] == 0 or b[0] == 0 or b[1] == 0 or c[0] == 0 or c[1] == 0:
        return 0
    ang = math.degrees(math.atan2(c[1]-b[1], c[0]-b[0]) - math.atan2(a[1]-b[1], a[0]-b[0]))
    return 360 + ang if ang < 0 else ang

def exercise0():
    if angle > Config.types[exercise_type]["stable_min"] and angle < Config.types[exercise_type]["stable_max"]:
        Config.status = 1
    elif Config.status == 1 and angle > Config.types[exercise_type]["peak_min"] and angle < Config.types[exercise_type]["peak_max"]:
        Config.status = 2
        Config.repetition += 1

async def time(websocket, path):
    count = 0
    while True:
        message = await websocket.recv() # receive the message e.g. the pose data (as string)
        pose = json.loads(message) # conver the pose string to a pose object
        #print(pose["keypoints"][0]) # prints the score of pose
        
        exercise_type = pose["type"]
        p_arr = np.zeros((17,2))
        for i in range(len(pose["keypoints"])):
            if pose["keypoints"][i]["score"] > 0.6:
                p_arr[Config.nameToLabel[pose["keypoints"][i]["part"]],0] = pose["keypoints"][i]["position"]["x"]
                p_arr[Config.nameToLabel[pose["keypoints"][i]["part"]],1] = pose["keypoints"][i]["position"]["y"]
            
                    
        #print(p_dict,"aaaaaaaaa")
        
        p1 = p_arr[Config.nameToLabel[Config.types[exercise_type]["p1"]]]
        p2 = p_arr[Config.nameToLabel[Config.types[exercise_type]["p2"]]]
        p3 = p_arr[Config.nameToLabel[Config.types[exercise_type]["p3"]]]

        angle = getAngle(p1,p2,p3)
        #print(angle, p1, p2, p3)
        
        match exercise_type:
            case 0:
                exercise0()
            
        
        
        print(Config.repetition)
        response = {"hello": "gymfeat"}
        # once the messages are cumulated to a window of 3, send a response
        if count % 3 == 0:
            await websocket.send(str(response)) 
        count += 1

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

'''
        if Config.status == 1 or Config.status == 2:
            Config.cum_arrays.append(p_arr)
            np.save("arr.npy",np.asarray(Config.cum_arrays))

    
        if len(Config.cum_arrays) > 10:
            y_coordinates = np.asarray(Config.cum_arrays)[:,0,1] 
            peak_widths = np.arange(1, 30)
            peak_indices = signal.find_peaks_cwt(y_coordinates[:], peak_widths)
            #peak_count = len(peak_indices)
        
            for i in y_coordinates[peak_indices]:
                if i > 220:
                    Config.repetition += 1
                    Config.cum_arrays = []
'''