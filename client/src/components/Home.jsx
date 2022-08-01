import React, { useState } from "react";
import Card from "./Card";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getAllDogs, createdFilter, orderByName, orderByWeight, getAllTemperaments, filterByTemp} from "../redux/actions"
import SearchBar from "./SearchBar";
import styles from "./Home.module.css"
import Navbar from "./Navbar";
import Paginated from "./Paginated"
import Loading from "./Loading"

export default function Home () {


    let dogState = useSelector((state) => state.allDogs)
    const dispatch = useDispatch()
    const [order, setOrder] = useState("")
    const temperaments = useSelector((state) => state.allTemperaments)
    
    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [dispatch])


    const [CurrentPag, setCurrentPage] = useState(1)
    const [DogsPerPage, setDogsPerPage] = useState(8)
    const TotalPages = Math.ceil(dogState.length / DogsPerPage)

    const nextPag = () => {
        setCurrentPage(CurrentPag + 1)
    }

    const prevPag = () => {
        if (CurrentPag !== 1) setCurrentPage(CurrentPag - 1)
    }

    const firstPag = () => {
        setCurrentPage(1)
    }

    const lastPage = () => {
        setCurrentPage(TotalPages)
    }

    const IndexLastDog = CurrentPag * DogsPerPage

    const IndexFirstDog = IndexLastDog - DogsPerPage

    const CurrentDogs = dogState.slice(IndexFirstDog, IndexLastDog)


    function handleSortName (e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1);
    }

    function handleSortWeight (e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1);
    }

    function handleRefresh (e) {
        e.preventDefault()
        dispatch(getAllDogs())
        setCurrentPage(1)
    }

    function handleCreatedFilter (e) {
        e.preventDefault()
        dispatch(createdFilter(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterTemp (e) {
        e.preventDefault()
        dispatch(filterByTemp(e.target.value))
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])


    return (
        <div className={styles.all}>
            {Object.entries(dogState).length === 0 ? (<Loading />) : (
                <div className={styles.all}>
                    <div className={styles.nav}>
                <Navbar />
            </div>
            <div className={styles.searchBar}>
                <SearchBar />
            </div>
            <div className={styles.filters}>
                <select className={styles.filtersBtn} onChange={e => handleSortName(e)}>
                    <option value="">Sort by name</option>
                    <option value="asc">Order A-Z</option>
                    <option value="desc">Order Z-A</option>
                </select>
                <select className={styles.filtersBtn} onChange={e => handleSortWeight(e)}>
                    <option value="">Sort by weight</option>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
                <select className={styles.filtersBtn} onChange={e => handleCreatedFilter(e)}>
                    <option value="All">All</option>
                    <option value="api">Api</option>
                    <option value="created">Created</option>
                </select>
                <select className={styles.filtersBtn} onChange={e => handleFilterTemp(e)}>
                <option key={0} value='all'>All temperaments</option>
                    {temperaments?.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    }).map(el => {
                        return (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        )
                    })}
                </select>
                <button className={styles.filtersBtn} onClick={handleRefresh}>Refresh</button>
            </div>
            <div className={styles.cards}>
                {CurrentDogs.map((d) => (
                    <Link to={"/home/" + d.id} className={styles.cardd}>
                        <Card className={styles.card} createdInDb={d.createdInDb} name={d.name} image={d.image} temperaments={d.temperaments} weightMin={d.weightMin} weightMax={d.weightMax} weight={d.weight}/>
                    </Link>
                ))}
            </div>
            <div className={styles.paginated}>
                <Paginated
                DogsPerPage={DogsPerPage}
                dogState={dogState.length}
                CurrentPag={CurrentPag}
                setCurrentPage={setCurrentPage}
                firstPag={firstPag}
                prevPag={prevPag}
                nextPag={nextPag}
                lastPag={lastPage}
                ></Paginated>
            </div>
                </div>
            )}
        </div>
    )
}