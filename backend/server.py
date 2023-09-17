from typing import List

from flask import Flask, request, jsonify
from flask_cors import CORS

from backend.HousingReqs import HousingReqs
from backend.HousingResult import HousingResult
from backend.language_translator import find_reqs
from backend.search import n_closest_houses

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return "Hello, World!"


def get_mock_houses_list() -> List[HousingResult]:
    res = []
    res_1 = HousingResult()
    res_1.longitude = -117.79
    res_1.latitude = 35.21
    res_1.other_data = {"water": True}
    res.append(res_1)
    return res



@app.route('/housing_query', methods=['GET'])
def return_json():
    all_params = request.args.to_dict()
    housing_query = all_params.get("query_text", None)
    if not housing_query:
        return jsonify({"error": "query_text parameter is missing"}), 400
    housing_reqs: HousingReqs = find_reqs(housing_query)
    houses_result = n_closest_houses(housing_reqs)
    # houses_result = get_mock_houses_list()
    payload = jsonify(houses_result)
    return payload


if __name__ == '__main__':
    app.run(debug=True)
