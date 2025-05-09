import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface pageProps {
    numberOfPages: number;
    totalProducts: number;
}

const Paginations = ({ numberOfPages, totalProducts }: pageProps) => {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const paramValue = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const onChangeHandler = (event: any, value: { toString: () => string }) => {
        params.set("page", value.toString());
        navigate(`${pathname}?${params}`);
    };

    return (
        <div className="flex justify-center items-center pt-10 mb-20">
            <Pagination
                count={numberOfPages}
                page={paramValue}
                defaultPage={1}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                color="primary"
                size="large"
                onChange={onChangeHandler}
            />
        </div>
    );
};

export default Paginations;
