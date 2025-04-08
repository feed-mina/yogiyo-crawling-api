from urllib import response


import json
from flask import Flask, jsonify, request
import requests
from urllib.parse import urlparse

class Connection:
    def __init__(self):
        self.nodes = set()
        self.nodes.add("127.0.0.1:5000")
        
    def connection(self):
        network = self.nodes
        for node in network:
            print("node", node)
            
        response = requests.get(f'http://{node}/receve_data', verify=False)
        if response.status_code == 200:
            length = response.json()['length']
            