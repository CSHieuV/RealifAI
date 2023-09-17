import requests

url = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address'
headers = {
    'Accept': 'application/json',
    'apikey': '2b1e86b638620bf2404521e6e9e1b19e',
}
params = {
    'postalcode': '22042',
    'page': '1',
    'pagesize': '10000'
}

response = requests.get(url, headers=headers, params=params)

# You can then use response.json() to get the JSON content.
json_response = response.json()
print(json_response)
if "prop" not in json_response.keys():
    print("error parsing:\n\n")
    print(json_response)
    exit(1)


for prop in json_response["property"]:
    if "address" in prop.keys() and "line1" in prop["address"].keys() and prop["address"]["line1"].lower() == "7111 strathmore st":
        print(f"{prop}\n\n")
