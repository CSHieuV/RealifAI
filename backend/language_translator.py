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
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="test hello",
        temperature=0
    )
    return response


if __name__ == "__main__":
    print(find_reqs("tewst hello"))