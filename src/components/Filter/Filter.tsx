import {Dispatch, SetStateAction} from "react";
import styles from "./Filter.module.css";

interface FilterProps {
    selectedYear: string;
    onYearChange: Dispatch<SetStateAction<string>>;
}

const Filter = ({selectedYear, onYearChange}: FilterProps) => {
    return (
        <div className={styles.filter}>
            <label>Filter by year</label>
            <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
            >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
        </div>
    );
};

export default Filter;
