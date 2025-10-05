import uvicorn
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import router as auth_router
from .geo import router as geo_router
from .prescriptions import router as presc_router
from .routers.analytics import router as analytics_router

load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
load_dotenv()  # also load from process CWD if present

app = FastAPI(title="MedSync API")

# CORS - allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(geo_router)
app.include_router(presc_router)
app.include_router(analytics_router, prefix="/api/v1/analytics", tags=["analytics"])

@app.get("/healthz")
def healthz():
    return {"ok": True}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
