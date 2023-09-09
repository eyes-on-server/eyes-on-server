# This code sample uses the 'requests' library:
# http://docs.python-requests.org
import requests
from requests.auth import HTTPBasicAuth
import json

url = "https://eyes-on-server.atlassian.net/rest/api/3/issue"

auth = HTTPBasicAuth("eyes_on_server@outlook.com", "ATATT3xFfGF07cwan7moJwt8uMO-WA76cZX27MEb-b9NlnffWrJGxhU77Fnz4df4DViKFl9D8frWP2nfxL2cd2DclIXbtpa9m04DKChUZeiemi4baY9b5wV4PIVMxh5uA6pU5bVWCl7X__qF8pgNU-28ukytKuksB0FKCud4jqGZGl15drbU9dI=23F11F4E")

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

# Erro: Exception has occurred: TypeError
# Object of type set is not JSON serializable
#   File "/home/gio/Codigos/EOS/repositorio_central/capturaDados/chamadoJira.py", line 16, in <module>
#     payload = json.dumps( {
#               ^^^^^^^^^^^^^
# TypeError: Object of type set is not JSON serializable
payload = json.dumps( {
  "fields": {
    "description": {
      "content": [
        {
          "content": [
            {
              "text": "Order entry fails when selecting supplier.",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    'issuetype': {
      'name': 'General requests'
    },
    "summary": "Main order flow broken",
    "project": {
        "key:" "EOS"
    },
  },
  "update": {}
} )

response = requests.request(
   "POST",
   url,
   data=payload,
   headers=headers,
   auth=auth
)

print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))