import json

import openai
from backend.HousingReqs import HousingReqs


def read_env():
    env_map = {}
    with open(".env", 'r') as f:
        for line in f.readlines():
            keyval = line.strip().split('=')
            key, value = keyval[0], keyval[1]
            env_map[key] = value
    return env_map


ENV = read_env()
openai.api_key = ENV["OPENAI_API_KEY"]


def find_reqs(query: str) -> HousingReqs:
    with open("HousingReqsPrompt", "r") as f:
        prompt = f.read().replace("{Prompt-Text}", query)
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", temperature=0,
                                                  messages=[{"role": "user", "content": prompt}])
        reqs_json = json.loads(completion.choices[0].message.content)

        housing_reqs = HousingReqs()
        housing_reqs.price_min = reqs_json.get("price_min", None)
        housing_reqs.price_max = reqs_json.get("price_max", None)
        housing_reqs.people_num = reqs_json.get("people_num", None)
        housing_reqs.water = reqs_json.get("water", None)
        housing_reqs.square_ft = reqs_json.get("square_ft", None)

        return housing_reqs


if __name__ == "__main__":
    print(find_reqs("I want a house for me and my 3 kids, I can pay up to $100,000. I want to live in the plains, "
                    "far from the ocean. I want a house with 5000 square ft"))
