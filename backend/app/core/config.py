from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="TELAX_", case_sensitive=False)

    # Example: postgresql+psycopg://user:pass@localhost:5432/telax
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/telax"

    # SECURITY
    jwt_secret_key: str = "change-me-in-env"  # override via TELAX_JWT_SECRET_KEY


settings = Settings()

