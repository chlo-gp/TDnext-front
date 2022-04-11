import { useRouter } from "next/router"
import Default from "../../../components/layouts/Default";
import axios from 'axios'

export default function Id({ product }) {
    const router = useRouter()
    return (
        <div>
            <Default>
                <div class="min-w-screen min-h-screen bg-red-400 flex items-center p-4 lg:p-10 overflow-hidden relative">
                    <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-18 mx-auto text-gray-800 relative md:text-left">
                        <div class="md:flex items-center -mx-10">
                            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                <div class="relative">
                                    <img src={product.img} class="w-full relative z-10" alt="" />
                                    <div class="border-4 border-red-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 px-10">
                                <div class="mb-10">
                                    <h1 class="font-bold uppercase text-2xl mb-2">{product.name}</h1>
                                    <h2 class="font-bold uppercase text-xl mb-5">{product.artist}</h2>
                                    <p class="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis... </p>
                                </div>
                                <div>
                                    <div class="inline-block align-bottom mr-5">
                                        <span class="text-2xl leading-none align-baseline">€</span>
                                        <span class="font-bold text-5xl leading-none align-baseline">{product.price}</span>
                                    </div>
                                    <div class="inline-block align-bottom">
                                        <button class="bg-red-400 opacity-75 hover:opacity-100 text-red-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                                            <i class="mdi mdi-cart -ml-2 mr-2"></i>ACHETER</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Default>
        </div>
    )
}

export async function getStaticProps(context) {
    const id = context.params.id
    const response = await axios.get(`http://localhost:5000/products/${id}`)
    const product = response.data
    return {
        props: {
            product
        }
    }
}

export async function getStaticPaths() {
    const response = await axios.get('http://localhost:5000/products')
    const results = response.data
    const paths = results.map(product => ({
        params: { id: product._id.toString() }
    }))
    console.log(paths)
    return {
        paths,
        fallback: false,
    }
}