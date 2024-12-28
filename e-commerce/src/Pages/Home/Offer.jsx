import React from 'react'
import Offer1 from '../../Assets/img/offer-1.jpg'
import Offer2 from '../../Assets/img/offer-2.jpg'
const Offer = () => {
    return (
        <>
            <div class="container-fluid pt-5 pb-3">
                <div class="row px-xl-5">
                    <div class="col-md-6">
                        <div class="product-offer mb-30" style={{height:"300px"}}>
                            <img class="img-fluid" src={Offer1} alt=""/>
                                <div class="offer-text">
                                    <h6 class="text-white text-uppercase">Save 20%</h6>
                                    <h3 class="text-white mb-3">Special Offer</h3>
                                    <a href="" class="btn btn-primary">Shop Now</a>
                                </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="product-offer mb-30" style={{height:"300px"}}>
                            <img class="img-fluid" src={Offer2} alt=""/>
                                <div class="offer-text">
                                    <h6 class="text-white text-uppercase">Save 20%</h6>
                                    <h3 class="text-white mb-3">Special Offer</h3>
                                    <a href="" class="btn btn-primary">Shop Now</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Offer
