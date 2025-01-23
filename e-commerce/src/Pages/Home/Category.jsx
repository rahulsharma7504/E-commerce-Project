import React from 'react'
import Cat1 from '../../Assets/img/cat-1.jpg'
import Cat2 from '../../Assets/img/cat-2.jpg'
import Cat3 from '../../Assets/img/cat-3.jpg'
import Cat4 from '../../Assets/img/cat-4.jpg'
import { useUserData } from '../../Context/UserContext/UserContext'

const Category = () => {
    const { allCategory } = useUserData()
    return (
        <>
            <div class="container-fluid pt-5">
                <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Categories</span></h2>
                <div class="row px-xl-5 pb-3">
                    {
                        allCategory?.map((category, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                                <a className="text-decoration-none" >
                                    <div className="cat-item d-flex align-items-center mb-4">
                                        <div className="overflow-hidden" style={{ width: "100px", height: "100px" }}>
                                            {/* Display only the first image */}
                                            {category?.image?.[0] && (
                                                <img
                                                    className="img-fluid mr-2"
                                                    src={category.image[0]}
                                                    alt={category?.name}
                                                />
                                            )}
                                        </div>
                                        <div className="flex-fill pl-3">
                                            <h6>{category?.name}</h6>
                                            <small className="text-body">{category.totalProducts} Products</small>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }


                </div>
            </div>

        </>
    )
}

export default Category
