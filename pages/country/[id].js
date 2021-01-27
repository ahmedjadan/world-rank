import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
const country = ({ country }) => {
  const {
    flag,
    gini,
    name,
    languages,
    subregion,
    region,
    area,
    population,
    currencies,
    nativeName,
    callingCodes,
    timezones,
  } = country;

  return (
    <Layout title={`World Rank | ${country.name}`}>
      <div className={styles.container} key={country.name}>
        <div className={styles.container__left}>
          <div className={styles.panel__container}>
            <img src={flag} alt={country.name} weidth="200" height="200" />
            <h1 className={styles.panel__name}>{name}</h1>
            <div className={styles.panel__region}>{region}</div>

            <div className={styles.panel__desc__Container}>
              <div className={styles.pop__container}>
                <div className={styles.desc__value}>
                  {population}
                </div>
                <div className={styles.desc__lable}>Population</div>
              </div>
              <div className={styles.area}>
                <div className={styles.desc__value}>{area.toLocaleString()}</div>
                <div className={styles.desc__lable}>Area (km)</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container__right}>
          <div className={styles.panel__details}>
            <h4 className={styles.panel__details__heading}>Details:</h4>

            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Capital</div>
              <div className={styles.panel__details__value}>
                {country.capital}
              </div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Languages</div>
              <div className={styles.panel__details__value}>
                {languages.map((name) => name.name).join(", ")}
              </div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Sub Region</div>
              <div className={styles.panel__details__value}>{subregion}</div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>currencies</div>
              <div className={styles.panel__details__value}>
                {currencies.map((curn) => curn.name).join(", ")}
              </div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Native Name</div>
              <div className={styles.panel__details__value}>{nativeName}</div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Calling Codes</div>
              <div className={styles.panel__details__value}>
                +{callingCodes.map((code) => code)}
              </div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Timezones</div>
              <div className={styles.panel__details__value}>
                {timezones.map((time) => time)}
              </div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Gini</div>
              <div className={styles.panel__details__value}>
                {gini ? `${gini} %` : "not available"}{" "}
              </div>
            </div>
            <div className={styles.panel__details__row}>
              <div className={styles.panel__details__lable}>Borders</div>
              <div className={styles.panel__details__value}>
                {country.borders.map((border) => border).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default country;

export const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};
export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};

// export const getServerSideProps = async ({ params }) => {
//   const res = await fetch(
//     `https://restcountries.eu/rest/v2/alpha/${params.id}`
//   );
//   const country = await res.json();
//   return {
//     props: {
//       country,
//     },
//   };
// };
