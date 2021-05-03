#!/usr/bin/env python

import asyncio
import datetime
import random
import websockets
import json

import numpy as np
from scipy import signal
import math
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean
from sklearn.preprocessing import MinMaxScaler

class Config:
    repetition = 0
    max_repetition = 0
    makeSend = 0
    status = 0
    exercise_type = 0
    total_distance = 0
    isFinished = False
    threePointExercises = [0,1,2,3,4]
    nameToLabel = {"nose":0, "leftEye":1, "rightEye":2, "leftEar":3, "rightEar":4, "leftShoulder":5, 
    "rightShoulder":6, "leftElbow":7, "rightElbow":8, "leftWrist":9, "rightWrist":10, "leftHip":11, "rightHip":12, 
    "leftKnee":13, "rightKnee":14, "leftAnkle":15, "rightAnkle":16}
    types = {0:{"name": "Squat" ,"p1":"rightShoulder", "p2":"rightHip", "p3":"rightKnee","stable_min":165, "stable_max":195 ,"peak_min":40 ,"peak_max":85},
    1:{"name": "Squat" ,"p1":"rightAnkle", "p2":"rightKnee", "p3":"rightHip","stable_min":120, "stable_max":190 ,"peak_min":40 ,"peak_max":100},
    2:{"name": "Squat" ,"p1":"leftHip", "p2":"leftKnee", "p3":"leftAnkle","stable_min":120, "stable_max":190 ,"peak_min":40 ,"peak_max":100},
    3:{"name": "Squat" ,"p1":"leftAnkle", "p2":"leftKnee", "p3":"leftHip","stable_min":150, "stable_max":190 ,"peak_min":40 ,"peak_max":120},
    4:{"name": "Squat" ,"p1":"rightHip", "p2":"rightKnee", "p3":"rightAnkle","stable_min":150, "stable_max":190 ,"peak_min":40 ,"peak_max":120},
    5:{"name": "Squat" ,"p1":"nose", "p2":"rightKnee", "p3":"rightAnkle","stable_min":150, "stable_max":190 ,"peak_min":40 ,"peak_max":120},
    6:{"name": "Squat" ,"p1":"rightShoulder", "p2":"rightHip", "p3":"rightKnee","stable_min":165, "stable_max":195 ,"peak_min":40 ,"peak_max":85},
    7:{"name": "Squat" ,"p1":"rightShoulder", "p2":"rightHip", "p3":"rightKnee","stable_min":165, "stable_max":195 ,"peak_min":40 ,"peak_max":85},
    8:{"name": "Squat" ,"p1":"rightShoulder", "p2":"rightHip", "p3":"rightKnee","stable_min":165, "stable_max":195 ,"peak_min":40 ,"peak_max":85},
    9:{"name": "Squat" ,"p1":"rightShoulder", "p2":"rightHip", "p3":"rightKnee","stable_min":165, "stable_max":195 ,"peak_min":40 ,"peak_max":85}
    }
    
    cum_arrays = []

def getAngle(a, b, c):
    if a[0] == 0 or a[1] == 0 or b[0] == 0 or b[1] == 0 or c[0] == 0 or c[1] == 0:
        return 0
    ang = math.degrees(math.atan2(c[1]-b[1], c[0]-b[0]) - math.atan2(a[1]-b[1], a[0]-b[0]))
    return 360 + ang if ang < 0 else ang

def threePoint(angle):
    if angle > Config.types[Config.exercise_type]["stable_min"] and angle < Config.types[Config.exercise_type]["stable_max"] and Config.status == 2:
        Config.status = 1
        Config.repetition += 1
        Config.makeSend = 1
        print(Config.repetition)
        tot = 0
        arr = np.load("0.npy")
        Config.cum_arrays = np.asarray(Config.cum_arrays)
        arr = arr.reshape(arr.shape[0], -1)
        Config.cum_arrays = Config.cum_arrays.reshape(Config.cum_arrays.shape[0], -1)
        '''
        scaler = MinMaxScaler()
        scaler.fit(arr)
        Config.cum_arrays = scaler.transform(Config.cum_arrays)
        '''
        rang = [0,1,24,25,10,11,28,29]
        for i in rang:
            distance, path = fastdtw(np.asarray(arr)[:,i], Config.cum_arrays[:,i], dist=euclidean)
            tot += distance
        print(tot)
        if Config.repetition >= Config.max_repetition:
            Config.isFinished = True
        Config.total_distance += tot
        Config.cum_arrays = []
    elif angle > Config.types[Config.exercise_type]["stable_min"] and angle < Config.types[Config.exercise_type]["stable_max"]:
        Config.status = 1
    elif Config.status == 1 and angle > Config.types[Config.exercise_type]["peak_min"] and angle < Config.types[Config.exercise_type]["peak_max"]:
        Config.status = 2
        


async def time(websocket, path):
    count = 0
    while True:
        message = await websocket.recv() # receive the message e.g. the pose data (as string)
        pose = json.loads(message) # conver the pose string to a pose object

        #print(pose["keypoints"][0]) # prints the score of pose
        if Config.exercise_type != pose["type"]:
            Config.exercise_type = pose["type"]
            Config.repetition = 0
            Config.isFinished = False
            await websocket.send(str(Config.repetition)) 
            Config.makeSend = 0
        Config.max_repetition = pose["repetition"]
        print(Config.max_repetition, Config.exercise_type)
        p_arr = np.zeros((17,2))
        for i in range(len(pose["keypoints"])):
            if pose["keypoints"][i]["score"] > 0.6:
                p_arr[Config.nameToLabel[pose["keypoints"][i]["part"]],0] = pose["keypoints"][i]["position"]["x"]
                p_arr[Config.nameToLabel[pose["keypoints"][i]["part"]],1] = pose["keypoints"][i]["position"]["y"]
            
                    
        '''
        if not np.all(p_arr==0):
            print(p_arr)
            Config.cum_arrays.append(p_arr)
        np.save("arr.npy",np.asarray(Config.cum_arrays))
        '''
        if Config.status == 1 or Config.status == 2:
            Config.cum_arrays.append(p_arr)
        

        p1 = p_arr[Config.nameToLabel[Config.types[Config.exercise_type]["p1"]]]
        p2 = p_arr[Config.nameToLabel[Config.types[Config.exercise_type]["p2"]]]
        p3 = p_arr[Config.nameToLabel[Config.types[Config.exercise_type]["p3"]]]

        angle = getAngle(p1,p2,p3)
        #await websocket.send(str(angle))
        #print(angle, p1, p2, p3)
        
        Config.makeSend = 0
        if Config.exercise_type in Config.threePointExercises:
                threePoint(angle)
  
        if Config.makeSend:
            await websocket.send(str(Config.repetition)) 
            Config.makeSend = 0
        
        if Config.isFinished:
            score_distance = Config.total_distance / Config.max_repetition
            score = -10
            await websocket.send(str(score)) 
        #response = {"hello": "gymfeat"}
        # once the messages are cumulated to a window of 3, send a response
        #if count % 3 == 0:
        #    await websocket.send(str(response)) 
        #count += 1

start_server = websockets.serve(time, '127.0.0.1', 5679)

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
