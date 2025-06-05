from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle
from typing import Optional

app = FastAPI()

# ––– Enable CORS for local frontend –––
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ––– Load both models at startup –––
with open("radiation_model.pkl", "rb") as f:
    global_model = pickle.load(f)

with open("Diff_radiation_model.pkl", "rb") as f:
    diffusion_model = pickle.load(f)


# ––– Request schemas –––
class YearInput(BaseModel):
    year: int
    model_type: Optional[str]  # must be "global" or "diffusion"


class DateInput(BaseModel):
    date: str  # format "YYYY-MM-DD"
    model_type: Optional[str]  # must be "global" or "diffusion"


# ––– Forecast full year for either model –––
def forecast_full_year_global(model, input_year: int):
    all_dates = pd.date_range(
        start=pd.Timestamp(f"{input_year}-01-01"),
        end=pd.Timestamp(f"{input_year}-12-31"),
        freq="D",
    )
    df_future = pd.DataFrame({"ds": all_dates})
    forecast_df = model.predict(df_future)
    out = forecast_df[["ds", "yhat", "yhat_lower", "yhat_upper"]].copy()
    out.columns = ["Date", "Forecast_Radiation", "Lower_Bound", "Upper_Bound"]
    out["Date"] = out["Date"].dt.strftime("%Y-%m-%d")
    return out.to_dict(orient="records")


def forecast_full_year_diffusion(model, input_year: int):
    dates = pd.date_range(f"{input_year}-01-01", f"{input_year}-12-31", freq="D")
    future_df = pd.DataFrame({"ds": dates})
    forecast = model.predict(future_df)
    forecast = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]]
    forecast.columns = ["Date", "Forecast_Radiation", "Lower_Bound", "Upper_Bound"]
    forecast["Date"] = forecast["Date"].dt.strftime("%Y-%m-%d")
    return forecast.to_dict(orient="records")


# ––– Forecast a single date for “Global” –––
def forecast_for_date_global(model, date_str: str):
    ds_date = pd.to_datetime(date_str)
    df_future = pd.DataFrame({"ds": [ds_date]})
    forecast_df = model.predict(df_future)
    row = forecast_df.iloc[0]
    return {
        "Date": row["ds"].strftime("%Y-%m-%d"),
        "Forecast_Radiation": float(row["yhat"]),
        "Lower_Bound": float(row["yhat_lower"]),
        "Upper_Bound": float(row["yhat_upper"]),
    }


# ––– Forecast a single date for “Diffusion” –––
def forecast_for_date_diffusion(model, date_str: str):
    ds_date = pd.to_datetime(date_str)
    df_future = pd.DataFrame({"ds": [ds_date]})
    forecast_df = model.predict(df_future)
    row = forecast_df.iloc[0]
    return {
        "Date": row["ds"].strftime("%Y-%m-%d"),
        "Forecast_Radiation": float(row["yhat"]),
        "Lower_Bound": float(row["yhat_lower"]),
        "Upper_Bound": float(row["yhat_upper"]),
    }


@app.get("/")
def root():
    return {"message": "API is working! Use /predict_year or /predict_date endpoints."}


@app.post("/predict_year")
def predict_year(data: YearInput):
    model_type = data.model_type.lower() if data.model_type else ""
    if model_type == "global":
        forecasts = forecast_full_year_global(global_model, data.year)
    elif model_type == "diffusion":
        forecasts = forecast_full_year_diffusion(diffusion_model, data.year)
    else:
        raise HTTPException(
            status_code=400, detail="Invalid model_type. Use 'global' or 'diffusion'."
        )

    return {
        "year": data.year,
        "model_type": model_type,
        "daily_forecasts": forecasts,
    }


@app.post("/predict_date")
def predict_date(data: DateInput):
    model_type = data.model_type.lower() if data.model_type else ""
    # Dispatch to correct single-date function
    if model_type == "global":
        forecast = forecast_for_date_global(global_model, data.date)
    elif model_type == "diffusion":
        forecast = forecast_for_date_diffusion(diffusion_model, data.date)
    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid model_type for date prediction. Use 'global' or 'diffusion'.",
        )

    return {"date": data.date, "model_type": model_type, "forecast": forecast}



# # main.py (test version)
# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# async def read_root():
#     return {"message": "Hello from FastAPI!"}
