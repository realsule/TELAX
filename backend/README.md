# TELAX Backend (FastAPI + PostgreSQL)

This backend powers TELAX (Teule Educational Leadership Agricultural Xperience).

## Directory structure (high-level)

```
backend/
  app/
    main.py                  # FastAPI app entrypoint
    core/
      config.py              # settings/env
      security.py            # password hashing, tokens (later)
    db/
      base.py                # SQLAlchemy Base + common mixins
      session.py             # engine + session factory
    models/
      __init__.py            # model exports
      enums.py               # Role, ProductCategory, etc.
      geo.py                 # Kibra geo tables (sub-areas)
      user.py                # core User model
      product.py             # Marketplace Product model
    schemas/
      __init__.py
      user.py                # Pydantic DTOs (later)
      product.py             # Pydantic DTOs (later)
    api/
      __init__.py
      v1/
        __init__.py
        router.py            # API router aggregator (later)
        marketplace.py       # Marketplace routes (later)
        communities.py       # Geo-Communities routes (later)
        knowledge.py         # Knowledge Vault routes (later)
  requirements.txt
```

## Notes

- **RBAC** is represented first-class via `User.role` (enum), and can later be extended to a many-to-many permissions model if needed.
- **Kibra geo** is represented via `KibraSubArea` + `GeoArea` to link users and content to local communities.
- **Media-ready** models include `media_urls` fields (JSON) to support high-quality image/video storytelling.

