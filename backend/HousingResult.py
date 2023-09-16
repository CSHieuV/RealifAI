from dataclasses import dataclass
from typing import Dict


@dataclass
class HousingResult:
    longitude: float
    latitude: float
    other_data: Dict[str, str]

    def __init__(self):
        pass
