from dataclasses import dataclass
from typing import Dict


@dataclass
class HousingResult:
    longitude: float
    latitude: float
    other_data: Dict[str, str]
    description: str

    def __init__(self, longitude, latitude, other_data):
        self.longitude = longitude
        self.latitude = latitude
        self.other_data = other_data
