import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function getQualitiyList() {
    try {
      const { content } = await qualityService.get();
    setQualities(content);
    setLoading(false);
  } catch (error) {
    errorCatcher(error);
  }
  }

  const getQualities = (arrayOfIds) => {
    return qualities.filter(q => arrayOfIds.includes(q._id));
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  useEffect(() => {
    getQualitiyList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
    }
    setError(null);
  }, [error]);

  return (
    <QualityContext.Provider value={{ qualities, getQualities }}>
      { !isLoading ? children : <h3>Loading...</h3> }
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
