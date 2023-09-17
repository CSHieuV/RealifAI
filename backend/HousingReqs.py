from typing import Optional
from dataclasses import dataclass


@dataclass
class HousingReqs:
    price_min: Optional[int]
    price_max: Optional[int]
    people_num: Optional[int]
    # water: Optional[bool]
    square_ft: Optional[int]
    newer_housing: Optional[bool]
    location: Optional[str]

    # Optional:
    # good_schools: bool
    # city_name: Optional[str]
    # basement: bool

    def __init__(self):
        pass
