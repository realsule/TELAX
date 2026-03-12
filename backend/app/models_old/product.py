from __future__ import annotations

import uuid
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin
from app.models.enums import ListingKind, ProductCategory

if TYPE_CHECKING:
    from app.models.user import User


class Product(Base, TimestampMixin):
    """
    Marketplace listing.

    - Farmers list produce (kales, cabbage, poultry, fish).
    - Schools browse 'Project Supplies' (fingerlings, seedlings).
    """

    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    farmer_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    listing_kind: Mapped[ListingKind] = mapped_column(
        SAEnum(ListingKind, name="listing_kind"),
        nullable=False,
        index=True,
    )
    category: Mapped[ProductCategory] = mapped_column(
        SAEnum(ProductCategory, name="product_category"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(String(140), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Currency handling: store amount as numeric; currency can be added later.
    price: Mapped[Decimal | None] = mapped_column(Numeric(12, 2), nullable=True)
    unit: Mapped[str | None] = mapped_column(String(40), nullable=True)  # e.g. "bunch", "kg", "tray", "piece"
    quantity_available: Mapped[Decimal | None] = mapped_column(Numeric(12, 3), nullable=True)

    # High-quality storytelling: multiple image/video URLs.
    media_urls: Mapped[list[str]] = mapped_column(JSONB, nullable=False, default=list)

    is_active: Mapped[bool] = mapped_column(nullable=False, default=True, index=True)

    farmer: Mapped[User] = relationship(back_populates="products")

