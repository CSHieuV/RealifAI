import pandas as pd
import numpy as np


df = pd.read_csv('California.csv')

# print(df["ocean_proximity"])
# df['ocean_proximity'] = np.where(df['ocean_proximity'] == "NEAR BAY", 1, 0)

# renaming columns
# df = df.rename(columns={'total_rooms': 'sqft_living', 'median_house_value': 'price'})

# df = df.drop(columns=['median_income'])

# df = df.drop(columns=['households'])

# df = df.drop(columns=['media'])

# df['yr_changed'] = 2023 - df['housing_median_age']

# df = df.drop(columns=['housing_median_age'])

df['total_bedrooms'] = np.maximum(df['total_bedrooms'] // 250, 1)


file_path = "California.csv"

df.to_csv(file_path, index=False)

print(f"Updated data saved to: {file_path}")
