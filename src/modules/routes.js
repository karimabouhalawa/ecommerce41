
import cartRouter from "./Cart/cart.routes.js";
import addressRouter from "./address/address.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRoutes from "./brand/brand.routes.js";
import categoryRoutes from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js";
import orderRouter from "./order/order.routes.js";
import productRoutes from "./product/product.routes.js";
import reviewRouter from "./reviews/review.routes.js";
import subCategoryRoutes from "./subcategory/subCategory.routes.js";
import userRouter from "./user/user.routes.js";
import wishListRouter from "./wishList/wishList.routes.js";




export const allRoutes = (app)=>{
    app.use("/api/v1/category",categoryRoutes);
    app.use("/api/v1/subcategory",subCategoryRoutes);
    app.use("/api/v1/brand",brandRoutes);
    app.use("/api/v1/product",productRoutes);
    app.use("/api/v1/user",userRouter);
    app.use("/api/v1/auth",authRouter);
    app.use("/api/v1/review",reviewRouter);
    app.use("/api/v1/wishlist",wishListRouter);
    app.use("/api/v1/address",addressRouter);
    app.use("/api/v1/coupon",couponRouter);
    app.use("/api/v1/cart",cartRouter);
    app.use("/api/v1/order",orderRouter);





    
    


    






}


