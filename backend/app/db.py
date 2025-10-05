import os
import asyncpg

_DB_POOL = None

async def get_pool():
    global _DB_POOL
    if _DB_POOL is None:
        dsn = os.environ.get("DATABASE_URL")
        if not dsn:
            raise RuntimeError("DATABASE_URL is not set")
        _DB_POOL = await asyncpg.create_pool(dsn)
    return _DB_POOL
