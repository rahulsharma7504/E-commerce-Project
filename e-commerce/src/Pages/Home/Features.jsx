import React from 'react'
import { FaCheck,FaShippingFast,FaExchangeAlt , FaPhoneVolume} from 'react-icons/fa';
import { useUserData } from '../../Context/UserContext/UserContext';
const Features = () => {
    const {allProducts}=useUserData();
    
    return (
        <>
            <div class="container-fluid pt-5">
                <div class="row px-xl-5 pb-3">
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center bg-light mb-4" style={{ padding: "30px" }}>
                            <h1 class=" text-primary m-0 mr-3"><FaCheck size={30} color="yellow" />                            </h1>
                            <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center bg-light mb-4" style={{ padding: "30px" }}>
                            <h1 class="text-primary m-0 mr-2"><FaShippingFast/></h1>
                            <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center bg-light mb-4" style={{ padding: "30px" }}>
                            <h1 class="text-primary m-0 mr-3"><FaExchangeAlt/></h1>
                            <h5 class="font-weight-semi-bold m-0">14-Day Return</h5>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center bg-light mb-4" style={{ padding: "30px" }}>
                            <h1 class=" text-primary m-0 mr-3"><FaPhoneVolume/></h1>
                            <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Features
