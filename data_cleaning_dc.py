import pandas as pd




df = pd.read_csv('DC.csv')

# getting rid of all null datapoints
# df = df.dropna()

# df = df.rename(columns={'BATHRM': 'bathrooms', 'BEDRM': 'bedrooms', 'LANDAREA': 'Sqft_living', "LATITUDE": 'latitude', "LONGITUDE": 'longitude'})


# df = df.rename(columns={'PRICE': 'price', 'YR_RMDL': 'Yr_changed'})

df['ocean_proximity'] = 0


# Save the DataFrame to a CSV file

file_path = "DC.csv"
df.to_csv(file_path, index=False)

print(f"Updated data saved to: {file_path}")
