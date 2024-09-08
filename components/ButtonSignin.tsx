/* eslint-disable */
"use client";

import Link from "next/link";
import config from "@/config";
import ButtonAccount from "@/components/ButtonAccount";
import {useCommonContext} from "@/context/common-context";

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {

  const {
    user,
    showLogoutModal,
  } = useCommonContext()


    return (
        showLogoutModal ? (
          <ButtonAccount />
        ) : (
            <Link
                className={`btn ${extraStyle ? extraStyle : ""} btn-gradient animate-shimmer`}
                href={config.auth.loginUrl}
            >
              {text}
            </Link>
        )
      // <Link
      //   href={config.auth.callbackUrl}
      //   className={`btn ${extraStyle ? extraStyle : ""}`}
      // >
      //   {user?.user_metadata?.avatar_url ? (
      //     <avatar_display
      //       src={user?.user_metadata?.avatar_url}
      //       alt={user?.user_metadata?.name || "Account"}
      //       className="w-6 h-6 rounded-full shrink-0"
      //       referrerPolicy="no-referrer"
      //       width={24}
      //       height={24}
      //     />
      //   ) : (
      //     <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0">
      //       {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0)}
      //     </span>
      //   )}
      //   {user?.user_metadata?.name || user?.email || "Account"}
      // </Link>
    );
};

export default ButtonSignin;
