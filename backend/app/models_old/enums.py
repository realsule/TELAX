from __future__ import annotations

from enum import Enum


class UserRole(str, Enum):
    FARMER = "FARMER"
    SCHOOL_STUDENT = "SCHOOL_STUDENT"
    COMMUNITY_MEMBER = "COMMUNITY_MEMBER"
    ADMIN = "ADMIN"


class KibraSubArea(str, Enum):
    LINDI = "LINDI"
    MAKINA = "MAKINA"
    SOWETO_EAST = "SOWETO_EAST"
    SOWETO_WEST = "SOWETO_WEST"
    KARANJA="KARANJA"
    SARANGOMBE = "SARANGOMBE"
    KISUMU_NDOGO = "KISUMU_NDOGO"
    SILANGA = "SILANGA"
    RAILA = "RAILA"


class ListingKind(str, Enum):
    PRODUCE = "PRODUCE"
    PROJECT_SUPPLIES = "PROJECT_SUPPLIES"


class ProductCategory(str, Enum):
    # Produce
    KALES = "KALES"
    CABBAGE = "CABBAGE"
    POULTRY = "POULTRY"
    FISH = "FISH"

    # Supplies
    FINGERLINGS = "FINGERLINGS"
    SEEDLINGS = "SEEDLINGS"

