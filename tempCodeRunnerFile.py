df['ocean_proximity'] = np.where(df['ocean_proximity'] == "NEAR BAY", 1, 0)
