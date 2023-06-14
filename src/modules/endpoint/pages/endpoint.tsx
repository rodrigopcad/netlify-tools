import Input from "common/components/input/input";
import Loader from "common/components/loader/loader";
import { useEffect, useMemo, useRef, useState } from "react";
import { EndpointController } from "../controllers/endpoint";

import style from "../styles/endpoint.module.css";

const Endpoint: React.FC = () => {
    const controller = useMemo(() => new EndpointController(), []);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            await controller.handleEndpoints();
            setLoading(false);

            setTimeout(() => {
                if (containerRef.current) {
                    controller.setContainerWidth(containerRef.current);
                }
            }, 0);
        };

        fetchData();
    }, [controller]);

    return (
        <>
            <div hidden={!loading}>
                <Loader />
            </div>

            <div ref={containerRef} className={style.container} hidden={loading}>
                <div className={style.searchbar}>
                    <Input placeholder="Pesquisar" setState={setSearch} />
                    <p>{controller.qtyEndpointsVisible} / {controller.qtyEndpointsTotal}</p>
                </div>

                {controller.search(search).map((item, i) => {
                    return <div className={style.item} key={i}>
                        <p>
                            <b>Endpoint: </b><span
                                dangerouslySetInnerHTML={controller.matchTheSearch(item?.endpoint, search)}></span>
                        </p>
                        <p>
                            <b>Procedure: </b><span
                                dangerouslySetInnerHTML={controller.matchTheSearch(item?.procedure, search)}></span>
                        </p>
                    </div>;
                })}
            </div >
        </>
    );
};

export default Endpoint;
