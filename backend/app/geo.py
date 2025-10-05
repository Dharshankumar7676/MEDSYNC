from fastapi import APIRouter, HTTPException, Request
from .db import get_pool

router = APIRouter(prefix="/geo", tags=["geo"])

@router.get("/nearest")
async def nearest(request: Request, type: str, lat: float, lng: float, radius_km: float = 10.0, need: str | None = None):
    pool = await get_pool()
    table = {"hospital":"hospitals","pharmacy":"pharmacies","blood_bank":"blood_banks"}.get(type)
    if not table:
        raise HTTPException(status_code=400, detail="Invalid type")
    # base query
    base = f"""
      select id, name, address,
        ST_Distance(location, ST_SetSRID(ST_MakePoint($1,$2),4326)::geography) as distance_m
      from {table}
      where ST_DWithin(location, ST_SetSRID(ST_MakePoint($1,$2),4326)::geography, $3)
      order by distance_m asc
      limit 50
    """
    radius_m = radius_km * 1000.0
    rows = await pool.fetch(base, lat, lng, radius_m)

    # Optional filter by "need" for pharmacies/blood banks
    if need and type == "pharmacy":
        ids = [r["id"] for r in rows]
        if ids:
            inv = await pool.fetch("select pharmacy_id, name, quantity from medicines where pharmacy_id = any($1) and lower(name) like lower($2)", ids, f"%{need}%")
            inv_map = {}
            for i in inv:
                inv_map.setdefault(i["pharmacy_id"], []).append(dict(name=i["name"], qty=i["quantity"]))
            enriched = []
            for r in rows:
                enriched.append({**dict(r), "inventory": inv_map.get(r["id"], [])})
            return {"results": enriched}
    if need and type == "blood_bank":
        ids = [r["id"] for r in rows]
        if ids:
            inv = await pool.fetch("select blood_bank_id, blood_group, units_available from blood_inventory where blood_bank_id = any($1) and blood_group=$2", ids, need)
            inv_map = {}
            for i in inv:
                inv_map[i["blood_bank_id"]] = dict(blood_group=i["blood_group"], units=i["units_available"])
            enriched = []
            for r in rows:
                enriched.append({**dict(r), "inventory": inv_map.get(r["id"])})
            return {"results": enriched}

    return {"results": [dict(r) for r in rows]}
