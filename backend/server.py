from typing import List

from flask import Flask, request, jsonify

from backend.HousingResult import HousingResult

app = Flask(__name__)


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
    housing_query = all_params["query_text"]
    houses_result = get_mock_houses_list()
    return jsonify(houses_result)


if __name__ == '__main__':
    app.run(debug=True)
