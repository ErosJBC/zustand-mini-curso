import { useEffect, useState } from "react"
import { tesloApi } from "../../../api/testlo.api";

export const RequestInfo = () => {
    const [requestInfo, setRequestInfo] = useState<unknown>();

    useEffect(() => {
        tesloApi.get("/auth/private")
            .then(response => setRequestInfo(response.data))
            .catch(error => setRequestInfo(error));
    }, []);

    return (
        <>
            <h2>Información</h2>
            <pre>
                {
                    JSON.stringify(requestInfo, null, 2)
                }
            </pre>
        </>
    );
}