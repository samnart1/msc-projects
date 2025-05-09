import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "./BackDrop";
import { logOutUser } from "../store/action";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutHandler = () => {
        dispatch(logOutUser(navigate));
    };

    return (
        <div className="relative z-30">
            <Button
                className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
                onClick={handleClick}
            >
                <Avatar alt="Menu" src="" />
            </Button>
            <Menu
                sx={{ width: "400px" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                    sx: { width: 160 },
                }}
            >
                <Link to="/profile">
                    <MenuItem onClick={handleClose} className="flex gap-2">
                        <BiUser className="text-xl" />
                        <span className="font-bold text-[16px] mt-1">
                            {user?.username}
                        </span>
                    </MenuItem>
                </Link>

                <Link to="/profile/orders">
                    <MenuItem onClick={handleClose} className="flex gap-2">
                        <FaShoppingCart className="text-xl" />
                        <span className="font-semibold">Order</span>
                    </MenuItem>
                </Link>

                <MenuItem onClick={logOutHandler} className="flex gap-2">
                    <IoExitOutline className="text-xl" />
                    <span className="font-semibold text-[16px] mt-1">
                        LogOut
                    </span>
                </MenuItem>
            </Menu>
            {open && <BackDrop data={undefined} />}
        </div>
    );
};

export default UserMenu;
