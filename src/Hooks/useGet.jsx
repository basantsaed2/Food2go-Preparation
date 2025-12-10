import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../Context/Auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removePreparation } from "../Store/CreateSlices";

export const useGet = ({ url, required }) => {
    // const auth = useAuth();
    const preparation = useSelector(state => state?.preparation?.data || '');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        if (required === true && !preparation?.token) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': preparation?.token ? `Bearer ${preparation?.token}` : '',
                },
            });
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            if (error.response.data.message === "Unauthenticated." && error.status === 401) {
                dispatch(removePreparation()); // Remove from Redux
                localStorage.clear();
                navigate('/login', { replace: true });
            }
        } finally {
            setLoading(false);
        }
    }, [url, preparation?.token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { refetch: fetchData, loading, data, required };
};
