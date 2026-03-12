from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin
from app.models.enums import UserRole

if TYPE_CHECKING:
    from app.models.geo import GeoArea
    from app.models.product import Product


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    email: Mapped[str | None] = mapped_column(String(255), unique=True, index=True, nullable=True)
    phone_number: Mapped[str | None] = mapped_column(String(32), unique=True, index=True, nullable=True)

    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str | None] = mapped_column(String(200), nullable=True)

    is_active: Mapped[bool] = mapped_column(nullable=False, default=True)
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole, name="user_role"), nullable=False)

    geo_area_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("geo_areas.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    geo_area: Mapped[GeoArea | None] = relationship(back_populates="users")
    products: Mapped[list[Product]] = relationship(back_populates="farmer")

