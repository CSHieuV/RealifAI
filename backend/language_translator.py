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
    with open("HousingReqsPrompt.txt", "r") as f:
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
        housing_reqs.newer_housing = reqs_json.get("newer_housing", None)
        housing_reqs.location = reqs_json.get("location", None)

        # print(f"Reqs found for query: {query}\nGPT Response:\n{reqs_json}\n\nReqs:\n{housing_reqs}\n")

        return housing_reqs


def get_desc(housing_query: str, housing_res: str) -> str:
    with open("HousingDescriptionPrompt.txt", "r") as f:
        prompt = f.read().replace("{Original-Request}", housing_query)
        prompt.replace("{House-Data}", housing_res)
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", temperature=0,
                                                  messages=[{"role": "user", "content": prompt}])
        desc = completion.choices[0].message.content
        return desc


if __name__ == "__main__":
    print(find_reqs("I want a house for me and my 3 kids, I can pay up to $100,000. I want to live in the plains, "
                    "far from the ocean. I want a house with 5000 square ft. I want a new house. I want a blue house. "
                    "I want to live in San Diego"))
