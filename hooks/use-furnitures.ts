import { Furniture } from "@/lib/product/model.entity";
import FurnitureFetchUseCase from "@/lib/product/model-fetch-use-case";
import { useInjection } from "inversify-react";
import React from "react";

export const useFurnitures = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const [furnitures, setFurnitures] = React.useState<Furniture[]>([]);
    const fetchFurnituresUseCase = useInjection(FurnitureFetchUseCase);
    const fetchFurnitures = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const furnitures = await fetchFurnituresUseCase.execute();
            setFurnitures(furnitures);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }, []);

    React.useEffect(() => {
        fetchFurnitures();
    }, [fetchFurnitures]);

    return {
        loadingFurnitures: isLoading,
        fetchFurnitures,
        furnitures,
    };
};
