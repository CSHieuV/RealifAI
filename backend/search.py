import pandas as pd
import numpy as np

def mixed_distance(row, requisites):
    """
    Computes a distance based on both numerical and categorical data.
    
    Parameters:
    - row (Series): A row from the DataFrame.
    - requisites (dict): The desired attributes.
    
    Returns:
    - float: The computed distance.
    """
    
    # Numerical distance
    num_vars = row.select_dtypes(include=[np.number])
    print(f"num vars is {num_vars}")
    num_reqs = {k: v for k, v in requisites.items() if k in num_vars.index}
    print(f"num_reqs is {num_reqs}")
    num_distance = np.linalg.norm(num_vars - pd.Series(num_reqs))
    print(f"num_distance is {num_reqs}")

    # Categorical distance: Simple matching coefficient
    cat_vars = row.select_dtypes(exclude=[np.number])
    cat_reqs = {k: v for k, v in requisites.items() if k in cat_vars.index}
    cat_distance = sum(cat_vars[k] != v for k, v in cat_reqs.items())
    
    return num_distance + cat_distance

requisites = {longitude, latitude}


cal_data = pd.read_csv('California.csv', sep=',', header=None)

print(cal_data)








# def closest_houses(housing_data, requisites, n=10):
#     """
#     Returns the n closest houses to the given requisites.

#     Parameters:
#     - housing_data (DataFrame): The housing data.
#     - requisites (dict): The desired house attributes.
#     - n (int): The number of houses to return.

#     Returns:
#     - DataFrame: The n closest houses.
#     """
    
#     # Calculate the distance for each row
#     distances = housing_data.apply(mixed_distance, axis=1, requisites=requisites)
    
#     # Sort housing data by distance
#     sorted_indices = distances.sort_values().index
#     return housing_data.loc[sorted_indices].head(n)




# housing_data = pd.DataFrame(data)


# print(closest_houses(housing_data, ))
