from typing import List

import pandas as pd
import numpy as np

from HousingReqs import HousingReqs
from HousingResult import HousingResult


def n_closest_houses_updated_simple(housing_reqs: HousingReqs, n: int=10) -> List[HousingResult]:
    # Load the datasets
    df_kansas = pd.read_csv('KansasCity.csv')
    df_california = pd.read_csv('California.csv')
    
    # Decide which dataset(s) to use based on the location specified in housing_reqs
    if housing_reqs.location == "Kansas":
        df_local = df_kansas
    elif housing_reqs.location == "California":
        df_local = df_california
    else:
        # If no specific location is provided, combine both datasets
        df_local = pd.concat([df_kansas, df_california], ignore_index=True)
    
    # Start with the selected dataframe
    filtered_df = df_local.copy()
    
    # Apply filters based on provided criteria
    if housing_reqs.price_min:
        filtered_df = filtered_df[filtered_df['price'] >= housing_reqs.price_min]
    if housing_reqs.price_max:
        filtered_df = filtered_df[filtered_df['price'] <= housing_reqs.price_max]
    if housing_reqs.people_num:
        # Assuming 1 person per bedroom as a basic filter
        filtered_df = filtered_df[filtered_df['bedrooms'] >= housing_reqs.people_num]
    if housing_reqs.water is not None:
        filtered_df = filtered_df[filtered_df['ocean_proximity'] == int(housing_reqs.water)]
    if housing_reqs.square_ft:
        filtered_df = filtered_df[filtered_df['sqft_living'] >= housing_reqs.square_ft]
    if housing_reqs.newer_housing is not None:
        # Houses built or renovated after 2000 are considered "new"
        year_threshold = 2000 if housing_reqs.newer_housing else 0
        filtered_df = filtered_df[filtered_df['yr_changed'] >= year_threshold]
    
    # Take the top n results (or whatever remains after filtering)
    filtered_df = filtered_df.head(n)
    
    # Convert the filtered dataframe to a list of HousingResult objects
    results = [
        HousingResult(
            longitude=row['longitude'], 
            latitude=row['latitude'], 
            other_data={col: str(row[col]) for col in filtered_df.columns if col not in ['longitude', 'latitude']}
        ) for _, row in filtered_df.iterrows()
    ]
    
    return results

# Sample Test the function with the sample criteria
# sample_reqs = HousingReqs(price_min=200000, price_max=600000, people_num=4, water=False, square_ft=1500, newer_housing=True, location="Kansas")
# test_results_simple = n_closest_houses_updated_simple(sample_reqs)
# print(test_results_simple)

