import pandas as pd




df = pd.DataFrame(data)

# Replace year_changed values based on condition
df.loc[df['year_renovated'] > 0, 'year_changed'] = df['year_renovated']

# Save the DataFrame to a CSV file
file_path = ""
df.to_csv(file_path, index=False)

print(f"Updated data saved to: {file_path}")
