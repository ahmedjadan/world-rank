import { useState } from "react";

import Head from "next/head";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchIput/SearchInput";
import CountryTable from "../components/CountriesTable/CountryTable";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filteredCountry = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.input__container}>
        <div className={styles.count}>
          Found {countries.length} countries in the database
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>
      <CountryTable countries={filteredCountry}/>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
