from typing import Optional
from dataclasses import dataclass


@dataclass
class HousingReqs:
    price_min: Optional[int]
    price_max: Optional[int]
    people_num: Optional[int]
    ocean: Optional[bool]
    newer_housing: Optional[bool]
    # Optional:
    # good_schools: bool
    # city_name: Optional[str]
    # basement: bool

    def __init__(self):
        pass
