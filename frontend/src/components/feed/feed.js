import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../store/session";
import { useHistory } from "react-router-dom";


const Feed = () => {
    const user = useSelector((state) => state.session.user);
        if (user.id !== )
}