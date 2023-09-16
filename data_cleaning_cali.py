import pandas as pd
import numpy as np


df = pd.read_csv('KansasCity.csv')

df['ocean_proximity'] = np.where(df['ocean_proximity'] == "NEAR BAY", 1, 0)


file_path = "California.csv"

df.to_csv(file_path, index=False)

print(f"Updated data saved to: {file_path}")
