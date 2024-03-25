import sys
import json
import requests

resp = {
    "from" : "d7",
    "to" : "d5",
    "piece": "p"
}

# json.dumps() — Takes in a Python object, and converts (dumps) it to a string.
print(json.dumps(resp))

#json.loads() — Takes a JSON string, and converts (loads) it to a Python object.

sys.stdout.flush()
