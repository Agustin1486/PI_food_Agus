import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesId } from "../../redux/action";
import styles from "../detail/Detail.module.css";

import NavBar from "../navBar/NavBar.jsx";

function Detail() {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipesId(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <div>
        <NavBar></NavBar>
      </div>
      <div>
        <p className={styles.par}></p>
      </div>
      {detail.title ? (
        <h1 className={styles.title}>{detail.title}</h1>
      ) : (
        <h1 className={styles.title}>Recipe not Found</h1>
      )}
      <div className={styles.card}>
        <div className={styles.dietss}>
          <h4>Diets Types</h4>
          {detail.diets?.map((diet, index) => (
            <p key={index}>{diet}</p>
          ))}
        </div>

        <img className={styles.image} src={detail.image} alt={detail.title} />
      </div>
      <div className={styles.score}>
        {/* <div className={styles.scores}>
          <h3 className={styles.h3score}>Score..:{detail.score}</h3>
        </div> */}
        <div className={styles.scores}>
          <h3 className={styles.h3score}>
            Health score:{detail.healthScore}
          </h3>
        </div>
      </div>
      <div className={styles.summaries}>
        <div className={styles.summarysteps}>
          <h3>Summary</h3>
          <p dangerouslySetInnerHTML={{ __html: detail.summary }} />
        </div>
        <div className={styles.summarysteps}>
          <h3>Steps</h3>
          <p>{detail.steps}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
