import pandas as pd




df = pd.read_csv('KansasCity.csv')

# Replace year_changed values based on condition
# df.loc[df['yr_renovated'] > 0, 'yr_changed'] = df['yr_renovated']

# df = df.drop(columns=['yr_renovated'])

df = df.rename(columns={'lat': 'latitude', 'long': 'longitude'})


# Save the DataFrame to a CSV file
file_path = "KansasCity.csv"
df.to_csv(file_path, index=False)

print(f"Updated data saved to: {file_path}")
