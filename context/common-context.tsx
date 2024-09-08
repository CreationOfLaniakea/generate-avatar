'use client';
import {createContext, useContext, useState} from "react";
import {useInterval} from "ahooks";
import {useSession} from "next-auth/react";

const CommonContext = createContext(undefined);
export const CommonProvider = ({
                                   children,
                               }) => {

    const {data: session, status} = useSession();
    const [user, setUser] = useState({});
    const [intervalUserData, setIntervalUserData] = useState(1000);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showGeneratingModal, setShowGeneratingModal] = useState(false);
    const [showPricingModal, setShowPricingModal] = useState(false);

    useInterval(() => {
        init();
    }, intervalUserData);

    async function init() {
        if (status == 'authenticated') {
            const userData = {
                // @ts-ignore
                user_id: session?.user?.user_id,
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
            }
            setUser(userData);
            setShowLogoutModal(true);
            setIntervalUserData(undefined);
        }
    }

    return (
        <CommonContext.Provider
            value={{
                user,
                setUser,
                showLogoutModal,
                setShowLogoutModal,
                showLoadingModal,
                setShowLoadingModal,
                showGeneratingModal,
                setShowGeneratingModal,
                showPricingModal,
                setShowPricingModal,
            }}
        >
            {children}
        </CommonContext.Provider>
    );

}

export const useCommonContext = () => useContext(CommonContext)
