import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
  const { loading, getProfession } = useProfession();
  const prof = getProfession(id);
  return !loading ? <p>{prof.name}</p> : "loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
