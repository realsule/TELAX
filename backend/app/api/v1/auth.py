from __future__ import annotations

from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, get_password_hash, verify_password
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import Token, UserCreate, UserLogin, UserRead


router = APIRouter()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate, db: Session = Depends(get_db)) -> User:
    """
    Signup with email or phone (at least one required).
    """
    if not payload.email and not payload.phone_number:
        raise HTTPException(status_code=400, detail="Either email or phone_number must be provided.")

    if payload.email:
        existing = db.query(User).filter(User.email == payload.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered.")

    if payload.phone_number:
        existing_phone = db.query(User).filter(User.phone_number == payload.phone_number).first()
        if existing_phone:
            raise HTTPException(status_code=400, detail="Phone number already registered.")

    user = User(
        email=payload.email,
        phone_number=payload.phone_number,
        full_name=payload.full_name,
        role=payload.role,
        hashed_password=get_password_hash(payload.password),
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(payload: UserLogin, db: Session = Depends(get_db)) -> Token:
    """
    Login with email or phone + password.
    """
    identifier = payload.identifier
    identifier_type = payload.identifier_type

    # Resolve by explicit type when provided; otherwise try email, then phone.
    if identifier_type == "email":
        user = db.query(User).filter(User.email == identifier).first()
    elif identifier_type == "phone":
        user = db.query(User).filter(User.phone_number == identifier).first()
    else:
        user = db.query(User).filter(User.email == identifier).first()
        if user is None:
            user = db.query(User).filter(User.phone_number == identifier).first()

    if user is None or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials.")

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user.")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(subject=str(user.id), expires_delta=access_token_expires)

    return Token(access_token=access_token)

