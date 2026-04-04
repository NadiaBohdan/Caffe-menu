import { favouriteRepository } from "./favourite.repository.js";
import { ApiError } from "#utils/error.util.js";

const checkFavourite = async (userId) => {
    const response = await favouriteRepository.getFavouriteId(userId);
    if(!response?.id) throw new ApiError(404, "Favourites do not found");

    return response.id;
}

export const favouriteService = {
    async toggle({ userId, productId }) {
        console.log("!!!!!!!Data: ", { userId, productId })
        const favouriteId = await checkFavourite(userId);

        const favouriteItem = await favouriteRepository.toggle({ favouriteId, productId });
        return favouriteItem;
    },

    async getAll({ userId }) {
        const favouriteId = await checkFavourite(userId);

        const favouriteItems = await favouriteRepository.getAll(favouriteId);
        return favouriteItems;
    }
}