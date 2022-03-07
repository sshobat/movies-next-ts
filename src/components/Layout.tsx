import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode,
}

const Layout = ({ children }: Props) => {
    
    const router = useRouter();
    
    return (
        <>
            <button
                onClick={() => router.push('/')}
            >
                HOME
            </button>
            {children}
        </>
    );
}

export default Layout;