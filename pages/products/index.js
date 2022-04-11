import Default from "../../components/layouts/Default"
import { useUser } from "../../context/userContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link'
import CreateProduct from '../../components/forms/createProduct'
export default function Home() {

    const { user } = useUser()
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => {
                setProducts(res.data)
            })

    }, []);
    return (
        <div>
            <Default>
                <div className="flex flex-col py-5 bg-red-300">
                    <h1 className="text-2xl font-bold my-5 text-center">Découvrez nos vinyles</h1>
                     
                    <div className="flex flex-wrap justify-center">

                        {
                            products.map(product => {
                                return (

                                    <Link href={`/products/${product._id}`} >
                                        <div className="mx-8 flex flex-col w-1/4 justify-center items-center cursor-pointer">
                                            <div class="rounded-full bg-white w-full shadow mb-4">
                                                <img src={product.img} className="mx-auto object-contain p-4" />
                                            </div>
                                            <div className="text-center font-bold w-full pl-4">
                                                <h2 key={product.id}>{product.name}, {product.artist}</h2>
                                                <p>{product.price}€</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
                {user != null && user.role == 'admin' && <CreateProduct />
                    }
            </Default>
        </div>
    )
}