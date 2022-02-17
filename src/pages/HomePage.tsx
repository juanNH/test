import { useEffect, useMemo } from "react";
import TdComponent from "../components/TdComponent";
import { usePeliculas } from "../hooks/usePeliculas";
import { usePaginado } from "../hooks/usePaginado";
import ButtonComponent from "../components/ButtonComponent";

const HomePage = () => {
  const { isLoading, peliculas, randomLoading, sortPeliculas } = usePeliculas();
  const { page, nextPage, prevPage } = usePaginado(peliculas.length - 5);
  const films = useMemo(() => {
    return peliculas.slice(page, page + 5);
  }, [peliculas, page, randomLoading]);
  useEffect(() => {}, [randomLoading]);

  return (
    <div>
      <h1>HomePage</h1>
      <ButtonComponent text="Mix" action={sortPeliculas} />
      <h2>
        Pagina {page / 5 + 1} -- Max paginas {Math.ceil(peliculas.length / 5)}
      </h2>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ButtonComponent text="Prev" action={prevPage} />
        <ButtonComponent text="Next" action={nextPage} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">nombre</th>
            <th scope="col">rate</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            films.map(({ id, name, rate, author }, index) => {
              return (
                <TdComponent
                  key={index}
                  id={id}
                  name={name}
                  rate={rate}
                  author={author}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
