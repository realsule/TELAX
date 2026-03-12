from __future__ import annotations

import uuid

from sqlalchemy import Enum as SAEnum
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin
from app.models.enums import KibraSubArea


class GeoArea(Base, TimestampMixin):
    """
    Represents a Kibra sub-area / neighborhood used to segment communities (forums)
    and to associate users + content with a local area.
    """

    __tablename__ = "geo_areas"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sub_area: Mapped[KibraSubArea] = mapped_column(SAEnum(KibraSubArea, name="kibra_sub_area"), nullable=False)
    display_name: Mapped[str] = mapped_column(String(120), nullable=False)

    # backrefs
    users: Mapped[list["User"]] = relationship(back_populates="geo_area")  # type: ignore[name-defined]

