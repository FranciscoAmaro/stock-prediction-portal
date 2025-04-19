import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState("");
  const [ma100, setMA100] = useState("");
  const [ma200, setMA200] = useState("");
  const [prediction, setPrediction] = useState("");
  const [mse, setMSE] = useState("");
  const [rmse, setRMSE] = useState("");
  const [r2, setR2] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("protected-view");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("predict/", { ticker: ticker });
      console.log(response.data);
      if (response.data.error) {
        setError(response.data.error);
        throw `${response.data.error}`;
      }
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot}${response.data.plot_img}`;
      const ma100Url = `${backendRoot}${response.data.plot_100_dma}`;
      const ma200Url = `${backendRoot}${response.data.plot_200_dma}`;
      const plotPredictionUrl = `${backendRoot}${response.data.plot_prediction}`;
      console.log(plotUrl, ma100Url, ma200Url, plotPredictionUrl);
      setPlot(plotUrl);
      setMA100(ma100Url);
      setMA200(ma200Url);
      setPrediction(plotPredictionUrl);
      setMSE(response.data.mse);
      setRMSE(response.data.rmse);
      setR2(response.data.r2);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Stock Ticker"
                className="form-control"
                onChange={(e) => setTicker(e.target.value)}
                required
              />
              <small>
                {error && <div className="text-danger">{error}</div>}
              </small>
              <button className="btn btn-info mt-3 w-100">
                {loading ? (
                  <span>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Please wait...
                  </span>
                ) : (
                  "See Prediction"
                )}
              </button>
            </form>
          </div>
          {/* Prediction Plots */}
          {prediction && (
            <div className="prediction mt-5">
              <div className="p-5">
                {plot && (
                  <img
                    src={plot}
                    alt="Prediction Plot"
                    className="img-fluid rounded"
                  />
                )}
              </div>
              <div className="p-5">
                {ma100 && (
                  <img
                    src={ma100}
                    alt="100 DMA"
                    className="img-fluid rounded"
                  />
                )}
              </div>
              <div className="p-5">
                {ma200 && (
                  <img
                    src={ma200}
                    alt="200 DMA"
                    className="img-fluid rounded"
                  />
                )}
              </div>
              <div className="p-5">
                {prediction && (
                  <img
                    src={prediction}
                    alt="Prediction"
                    className="img-fluid rounded"
                  />
                )}
              </div>
              <div className="text-light p-3">
                <h4>Model Evaluation</h4>
                <p>Mean Squared Error (MSE): {mse}</p>
                <p>Root Mean Squared Error (RMSE): {rmse}</p>
                <p>R-Squared: {r2}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default Dashboard;
