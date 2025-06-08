---
# Solar Radiation Prediction System

A full-stack web application that predicts solar radiation based on meteorological parameters using machine learning models. Developed under the mentorship of the **India Meteorological Department (IMD)**, this system combines data collection, preprocessing, model training, and real-time prediction delivery through a responsive web interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Project Overview

This system leverages historical meteorological data and machine learning models, specifically **Prophet**, to accurately predict solar radiation levels. The **FastAPI** backend efficiently handles data processing and prediction logic, while the **React** frontend, styled with **Tailwind CSS**, offers an intuitive user interface. This interface allows users to input parameters, visualize prediction results, and analyze crucial data trends, making it a powerful tool for various applications.

---

## Features

- **Solar Radiation Prediction:** Get real-time solar radiation predictions by inputting key meteorological parameters.
- **Correlation Analysis:** Visualize and understand the relationships between different weather variables and their impact on solar radiation.
- **User Roles:** Supports distinct functionalities for **Data Scientists**, **Energy Analysts**, and **Agricultural Planners**.
- **Responsive UI:** Enjoy a seamless experience across all devices thanks to a responsive design built with **React** and **Tailwind CSS**.
- **RESTful API:** A robust **FastAPI** backend provides prediction and analysis endpoints, ensuring easy integration with other systems.
- **Export Reports:** Download prediction results and trend graphs in various formats for offline analysis and reporting.
- **Model Configuration:** (For Data Scientists) Easily adjust and configure model parameters for training and prediction to fine-tune performance.

---

## Technology Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** FastAPI, Uvicorn
- **Machine Learning:** Prophet, Pandas, NumPy
- **Data Formats:** CSV for historical data input
- **Others:** Python virtual environment for robust dependency management

---

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

-   **Node.js**: (v16 or higher recommended) - [Download Node.js](https://nodejs.org/en/)
-   **Python**: (v3.8 or higher) - [Download Python](https://www.python.org/downloads/)
-   **pip**: Python package installer - [pip installation guide](https://pip.pypa.io/en/stable/installation/)

---

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/solar-radiation-prediction.git](https://github.com/yourusername/solar-radiation-prediction.git)
    cd solar-radiation-prediction/backend
    ```
2.  **Create and activate a virtual environment:**

    **On macOS/Linux:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
    **On Windows (PowerShell):**
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  **Install backend dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`.

---

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or as indicated in your terminal).

---

## Usage

1.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  Input meteorological parameters such as **temperature**, **humidity**, **wind speed**, and **cloud cover** into the provided form.
3.  Submit the form to receive instant solar radiation predictions.
4.  Explore the **correlation analysis graphs** and **trend visualizations** to gain deeper insights into the data.
5.  Utilize the export functionality to download prediction results and trend graphs for further offline analysis.
6.  **(For Data Scientists)** Access dedicated UI sections or interact directly with the API to configure model parameters and initiate new training sessions.

---

## Project Structure

```graphql
solar-radiation-prediction/
│
├── backend/                # FastAPI backend source code
│   ├── main.py             # API routes and app initialization
│   ├── model.py            # ML model loading and prediction logic
│   ├── data_processing.py  # Data cleaning and preprocessing functions
│   ├── requirements.txt    # Python dependencies
│   └── ...
│
├── frontend/               # React frontend source code
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page-level components
│   │   ├── App.jsx         # Main application component
│   │   └── index.jsx       # Entry point for the React application
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── package.json        # Frontend dependencies and scripts
│   └── ...
│
├── data/                   # Sample historical data files (e.g., CSV)
├── models/                 # Trained machine learning model files (.pkl or Prophet model files)
├── README.md               # This README file
└── ...
```
---

## Contributing

We welcome contributions to enhance this project! To contribute, please follow these steps:

1.  **Fork the repository.**
2.  Create your feature branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3.  Commit your changes:
    ```bash
    git commit -m 'Add new feature'
    ```
4.  Push to your branch:
    ```bash
    git push origin feature/your-feature
    ```
5.  Create a **Pull Request**.

---


## Contact

For any questions or inquiries, feel free to reach out via GitHub:

**GitHub:** [https://github.com/Vedant1612/IMD-Project/](https://github.com/Vedant1612/IMD-Project/)

---

Thank you for using the Solar Radiation Prediction System!
