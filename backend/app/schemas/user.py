from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, EmailStr, Field

from app.models.enums import UserRole


class UserBase(BaseModel):
    full_name: str | None = None
    role: UserRole = Field(default=UserRole.COMMUNITY_MEMBER)


class UserCreate(UserBase):
    # One of email or phone is required at API level (validated in route).
    email: EmailStr | None = None
    phone_number: str | None = None
    password: str


class UserLogin(BaseModel):
    identifier: str  # email or phone
    identifier_type: Literal["email", "phone"] | None = None
    password: str


class UserRead(UserBase):
    id: str
    email: EmailStr | None = None
    phone_number: str | None = None
    is_active: bool

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: str | None = None

