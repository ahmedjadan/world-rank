import React, { useState } from "react";
import Link from "next/link";
import { orderBy } from "./OrderBy";
import styles from "./CountryTable.module.css";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountry = orderBy(countries, value, direction);
  const setValueAndDirection = (value) => {
    swicherOrder();
    setValue(value);
  };
  const swicherOrder = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };
  return (
    <div>
      <div className={styles.heading}>
        <button
          name="name"
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>
        <button
          name="population"
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>
        <button
          name="area"
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (Km <sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>
        <button
          name="gini"
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountry &&
        orderedCountry.map((country) => (
          <Link
            href={`/country/${country.alpha3Code}`}
            key={country.alpha3Code}
          >
            <div className={styles.row}>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>
                {country.population.toLocaleString()}
              </div>
              <div className={styles.area}>{country.area || "0"}</div>
              <div className={styles.gini}>{country.gini || "0"} %</div>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default CountryTable;

//

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};
