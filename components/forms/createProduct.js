import { useForm } from 'react-hook-form';
import { useUser } from "../../context/userContext";
import axios from 'axios'
import { useSnackbar } from 'notistack';
import Router from 'next/router';

export default function CreateProduct() {

    const { token } = useUser()
    const { register,handleSubmit, formState: { errors } } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = (data) => {

        console.log(data)
        axios.post('http://localhost:5000/products', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(res)
                if (res.status != 201) {
                    enqueueSnackbar('Error')
                    console.log(errors);
                } else {
                    enqueueSnackbar('Product created')
                }
            }).then(()=> Router.push('/products'))
    };

    return (
        <div class="bg-red-400 w-full sm:w-3/4 max-w-lg p-10 pb-6 shadow-2xl rounded my-5 mx-auto">
            <div class="text-white pb-4 text-2xl font-semibold">Ajouter un album</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    class="block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300"
                    id="username"
                    type="text"
                    placeholder="Titre" {...register("name", { required: true, maxLength: 80 })}
                />
                <input
                    class=" text-gray-700 p-1 m-4 ml-0 w-3/5 rounded text-lg font-normal placeholder-gray-300"
                    id="artist"
                    type="text"
                    placeholder="Artiste" {...register("artist", { required: true })}
                />
                <input
                    class=" text-gray-700 p-1 m-4 ml-0 w-1/5 rounded text-lg font-normal placeholder-gray-300"
                    id="price"
                    type="text"
                    placeholder="Prix" {...register("price", { required: true })}
                />
                <input
                    class="inline-block mt-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 px-6 py-2 rounded text-white shadow-lg"
                    type='submit' value="Créer"
                />
            </form>
        </div>

    )
}