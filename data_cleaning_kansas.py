import pandas as pd




df = pd.read_csv('backend/KansasCity.csv')

# Replace year_changed values based on condition
# df.loc[df['yr_renovated'] > 0, 'yr_changed'] = df['yr_renovated']

# df = df.drop(columns=['sqft_living15'])

# df = df.drop(columns=['sqft_above'])

# df = df.drop(columns=['sqft_basement'])

# df = df.drop(columns=['sqft_living15'])


# df = df.rename(columns={'lat': 'latitude', 'long': 'longitude'})

# df = df.drop(columns=['floors'])

df['ocean_proximity'] = 1

# Save the DataFrame to a CSV file
file_path = "backend/KansasCity.csv"
df.to_csv(file_path, index=False)

print(f"Updated data saved to: {file_path}")
