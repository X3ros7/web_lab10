import {getFirestore} from "firebase/firestore";
import {app} from "./";

export const firestore_db = getFirestore(app);
