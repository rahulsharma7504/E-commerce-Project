import { useCategory } from "../CategoryManageContext";
import { useProduct } from "./ProductsManageContext";
import { useUsers } from "./UserManageContext";
import { useVendor } from "./VendorManageContext";

const useAdminData = () => {
    const { readCategories } = useCategory();
    const { getProduct } = useProduct();
    const { fetchVendors } = useVendor();
    const { fetchUsers } = useUsers();

    return {
        readCategories,
        getProduct,
        fetchVendors,
        fetchUsers,
    };
};

export default useAdminData;
