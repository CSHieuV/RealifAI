from typing import Optional
from dataclasses import dataclass


@dataclass
class HousingReqs:
    price_min: Optional[int]
    price_max: Optional[int]
    people_num: Optional[int]
    # Optional:
    good_schools: bool
    city_name: Optional[str]
    basement: bool

