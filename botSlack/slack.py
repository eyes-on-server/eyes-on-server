import requests
import json

# !!Integrar a API

mensagem = {
    "text": f"""
        ALERTA:
        Sua CPU ultrapassou 92% de processamento!
"""}

chatCliente = "https://hooks.slack.com/services/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"

postMsg = requests.post(chatCliente, data=json.dumps(mensagem))
print(postMsg.status_code)